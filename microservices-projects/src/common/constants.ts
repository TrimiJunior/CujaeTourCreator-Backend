export enum RabbitMQ {
  ProjectQueue = 'projects',
}

export enum ProjectMSG {
  CREATE = 'CREATE_PROJECT',
  FIND_ALL = 'FIND_PROJECTS',
  FIND_ONE = 'FIND_PROJECT',
  UPDATE = 'UPDATE_PROJECT',
  DELETE = 'DELETE_PROJECT',
  UPLOAD = 'UPLOAD_IMG',
  FIND_ALL_BY_USER = 'FIND_ALL_BY_USER',
  ADD_LIKES = 'ADD_LIKES',
  REMOVE_LIKES = 'REMOVE_LIKES',
  FIND_UNVALIDED = 'FIND_UNVALIDED',
  VALIDATE_PROJECT = 'VALIDATE_PROJECT',
  FIND_VALIDED = 'FIND_VALIDED',
  UNVALIDATE_PROJECT = 'UNVALIDATE_PROJECT',
  FOR_REVISION = 'FOR_REVISION',
  TO_NEUTRAL = 'TO_NEUTRAL',
  ADD_COMMENT = 'ADD_COMMENT',
  REMOVE_COMMENT = 'REMOVE_COMMENT',
  FILTER_BY_STATUS = 'FILTER_BY_STATUS',
  CHANGE_USERNAME_PROJECT = 'CHANGE_USERNAME_PROJECT',
  EDIT_COMMENT = 'EDIT_COMMENT',
  ADD_RATE = 'ADD_RATE',
  DELETE_RATE = 'DELETE_RATE',
  EDIT_RATE = 'EDIT_RATE',
}
