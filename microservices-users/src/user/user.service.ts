import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { createWriteStream } from 'fs';
import * as fs from 'fs';
import { UserRole } from 'src/common/constants';
import { sendAcceptEmail } from 'src/common/sendMail/accepted-tour';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(userDTO: UserDTO): Promise<IUser> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userDTO.password, saltOrRounds);
    const newUser = new this.model({ ...userDTO, password: hashedPassword });
    // const newUser = new this.model({ ...userDTO });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }
  async findByName(username: string): Promise<IUser[]> {
    return await this.model.find({ username });
  }
  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    // const hash = await this.hashPassword(userDTO.password);
    // const user = { ...userDTO, password: hash };
    const allowedRoles = ['creator', 'user', 'admin', 'moderator'];
    const { role } = userDTO;
    if (!allowedRoles.includes(role)) {
      throw new Error(`El rol no es válido`);
    }

    return await this.model.findByIdAndUpdate(id, userDTO, { new: true });
  }
  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
    // return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async deleteUser(id: string, currentUser: string) {
    if (id === currentUser) {
      throw new Error('No puedes eliminar tu propia cuenta');
    }
    return await this.model.findByIdAndDelete(id);
  }

  async findByUsername(email: string) {
    return await this.model.findOne({ email });
  }
  async findByEmail(email: string) {
    return await this.model.findOne({ email });
  }
  async findByPassword(password: string) {
    return await this.model.findOne({ password });
  }

  async updatePassword(id: string, newPassword: string): Promise<IUser | null> {
    try {
      const oldUser = await this.model.findOne({ _id: id });
      console.log('param pass: ', newPassword);
      console.log('oldUser: ', oldUser);
      if (!oldUser) {
        return null;
      }

      const saltOrRounds = 10;

      const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
      oldUser.password = hashedPassword.toString();
      // const newUser = new this.model({ ...oldUser, password: hashedPassword });
      // // const newUser = new this.model({ ...userDTO });

      // oldUser.password = newPassword.toString();
      const updatedUser = await oldUser.save();
      console.log('New user: ', updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error(
        `Error al actualizar la contraseña del usuario: ${error}`,
      );
    }
  }

  async addFavorite(id: string, favorite: string): Promise<any> {
    const user = await this.model.findOne({ _id: id });
    if (!user) {
      // throw new Error('Usuario no encontrado');
      return { message: 'Usuario no encontrado' };
    }
    const isFavorite = user.favorites.includes(favorite);
    if (isFavorite) {
      // throw new Error('Ya existe el favorito');
      return { message: 'Ya existe el favorito' };
    }
    user.favorites.push(favorite);
    const updatedUser = await user.save();
    return updatedUser;
  }

  async removeFavorite(id: string, favorite: string): Promise<any> {
    const oldUser = await this.model.findOne({ _id: id });
    try {
      if (!oldUser) {
        return { message: 'Usuario no encontrado' };
      }
      oldUser.favorites = oldUser.favorites.filter(
        (favorites) => favorites !== favorite,
      );
      const updatedUser = await oldUser.save();
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al eliminar favorito: ${error}`);
    }
  }

  // async addProject(id: string, projectId: string): Promise<any> {
  //   const user =  await this.model.findOne({_id: id});
  //   if (!user) {
  //     return { message: 'Usuario no encontrado' };
  //   }
  //   if(user.perValidate.length < 9){

  //     const myProjects = user.perValidate.includes(projectId);
  //     if(myProjects){
  //       return { message: 'Ya se encuentra pendiente ese proyecto' };
  //     }
  //     user.perValidate.push(projectId);
  //     const updatedUser = await user.save();
  //     return updatedUser;
  //   }
  // }

  async addProject(projectId: string): Promise<any> {
    console.log('projectId', projectId);
    const users = await this.model.find(); //dame a todos
    if (!users) {
      return { message: 'Usuarios no encontrados' };
    }

    const projectIdExists = users.some((user) => {
      return user.perValidate.includes(projectId);
    });

    if (!projectIdExists) {
      const eligibleUser = users.find((user) => {
        return (
          user.perValidate.length < 9 &&
          !user.perValidate.includes(projectId) &&
          user.role === 'moderator'
        );
      });

      if (eligibleUser) {
        eligibleUser.perValidate.push(projectId);
        const updatedUser = await eligibleUser.save();
        //sendmail(updatedUser.username)
        return updatedUser;
      } else {
        return { message: 'No hay usuario disponible' };
      }
    } else {
      return { message: 'El proyecto ya está asigando' };
    }
  }

  async removeProject(id: string, projectId: string): Promise<any> {
    try {
      const user = await this.model.findOne({ _id: id });

      if (!user) {
        return { message: 'Usuario no encontrado' };
      }
      user.perValidate = user.perValidate.filter((per) => per !== projectId);

      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al eliminar perValidar: ${error}`);
    }
  }

  async asignRole(id: string, newRole: UserRole): Promise<IUser | null> {
    try {
      const oldUser = await this.model.findOne({ _id: id });
      if (!oldUser) {
        return null;
      }

      if (!Object.values(UserRole).includes(newRole)) {
        throw new Error(`El nuevo rol '${newRole}' no es válido.`);
      }

      oldUser.role = newRole;
      const updatedUser = await oldUser.save();
      console.log('New user: ', updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al asignar rol al usuario: ${error}`);
    }
  }

  ///new stuff
  // async sendAcceptedMail(mail: string): Promise<any> {
  //   try {
  //     const user = this.model.find({ mail });
  //     if (user) {
  //       return sendAcceptEmail(mail);
  //     } else {
  //       throw new Error(`El correo no existe`);
  //     }
  //   } catch (error) {
  //     throw new Error(`Error al enviar email: ${error}`);
  //   }
  // }

  async checkMail(email: string): Promise<IUser> {
    console.log('mail param: ', email);
    try {
      const user = await this.model.find();
      console.log('user', user);

      const newuser = await user.find((u) => u.email === email);
      console.log('result: ', newuser);
      if (!newuser) {
        throw new Error(`No existe el correo`);
      } else {
        console.log('inside good');
        return newuser;
      }
    } catch (error) {
      throw new Error(`Error al revisar email: ${error}`);
    }
  }

  async findAllExceptMe(id: string): Promise<any> {
    try {
      const user = await this.model.find();
      const userNoMe = user.filter((u) => u._id.toString() !== id);
      return userNoMe;
    } catch (error) {
      throw new Error(`Error al encontrar usuario: ${error}`);
    }
  }

  async validatePassword(id: string, password: string): Promise<any> {
    const user = await this.model.findOne({ _id: id });

    // const newuser = await user.find((u) => u._id.toString() === id);
    if (user && (await this.comparePassword(password, user.password))) {
      return { status: 200, message: 'Las contraseñas coinciden.' };
    }
    return { status: 401, message: 'Las contraseñas no coinciden.' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    // const user = await this.model.findOne({ email });
    const user = await this.model.find();
    const newuser = await user.find((u) => u.email === email);
    if (newuser && (await this.comparePassword(password, newuser.password))) {
      return newuser;
    }
    return null;
  }

  async comparePassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
  }
}
