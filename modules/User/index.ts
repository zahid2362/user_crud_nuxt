    import { defineNuxtModule } from "nuxt/kit";
    import {resolve, join} from 'path';
    import type { Nuxt } from "nuxt/schema";

    export default defineNuxtModule({
        meta:{
            name: "user-module",
            configKey: "user-module",
            compatibility:{
                nuxt: "^3.12.4"
            }
        },
        setup(options: any,nuxt: Nuxt){
            //auto register component
            nuxt.hook("components:dirs",(dirs)=>{
                dirs.push({
                    path:join(__dirname,'components')
                })
            }),
            //auto register composables
            nuxt.hook("imports:dirs",(dirs)=>{
                dirs.push(resolve(__dirname ,'./composables'))
            }),
            //register page
            nuxt.hook("pages:extend",(pages)=>{
                pages.push({
                    name:'user.index',
                    path:'/user',
                    file: resolve(__dirname, './pages/index.vue'),
                })
                pages.push({
                    name:'user.create',
                    path:'/user/create',
                    file: resolve(__dirname, './pages/create.vue'),
                }),
                pages.push({
                    name:'user.update',
                    path:'/user/:id',
                    file: resolve(__dirname, './pages/[id].vue'),
                })
            })
        }
    })
