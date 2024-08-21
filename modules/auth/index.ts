import { defineNuxtModule } from "nuxt/kit";
import { resolve, join } from 'path';
import type { Nuxt } from "nuxt/schema";

    export default defineNuxtModule({
        meta:{
            name: "auth-module",
            configKey: "auth-module",
            compatibility:{
                nuxt: "^3.12.4"
            }
        },
        setup(options, nuxt: Nuxt){
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
                    name:'auth.login',
                    path:'/login',
                    file: resolve(__dirname, './pages/index.vue'),
                })
            })
        }
    })
