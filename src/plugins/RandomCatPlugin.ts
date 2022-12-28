import {Allow, Ctx, Permission, PluginCommonModule, ProductService, RequestContext, Transaction, VendurePlugin} from "@vendure/core";
import {Resolver, Mutation, Args} from '@nestjs/graphql';
import {Injectable} from '@nestjs/common';
import http from 'http';
import gql from 'graphql-tag';


const schemaExtension = gql`
extend type Mutation {
addRandomCat(id: ID!): Product!
}
`;


@Injectable()
export class CatFetcherService {
//    fetch a random cat form random.cat
    fetchCat(): Promise<string>{
        return new Promise<string>((resolve => {
            http.get('http://aws.random.cat/meow', (resp) => {
                let data = '';
                
                resp.on('data',chunk => {
                    
                    return data += chunk;
                });
                resp.on('end', () => {
                    console.log(data);
                    
                    return resolve(JSON.parse(data).file);
                });
            });
        }));
    }
}
@Resolver()
export class RandomCatResolver {
    constructor(private productService: ProductService, private catFetcher: CatFetcherService){}

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateCatalog)
    async addRandomCat(@Ctx() ctx: RequestContext, @Args() args: any) {
        const catImageUrl = await this.catFetcher.fetchCat();
        console.log('cat image', catImageUrl);
        
        return this.productService.update(ctx, {
            id: args.id,
            customFields: {catImageUrl}
        })
    }
}
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [CatFetcherService],
    adminApiExtensions: {
        schema: schemaExtension,
        resolvers: [RandomCatResolver]
    },
    configuration: config => {
        config.customFields.Product.push({
            type: 'string',
            name: 'catImageUrl'
        });
        return config;
    }

})






export class RandomCatPlugin {}
