import {Module} from '@nestjs/common';
import {GraphQLModule} from "./graphql.module";

@Module({
    imports: [GraphQLModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
