import {Module} from "@nestjs/common";
import { ClientProxyCujaeTourCreator} from './client-proxy';

@Module({
    providers: [ClientProxyCujaeTourCreator],
    exports: [ClientProxyCujaeTourCreator],
})
export class ProxyModule{}