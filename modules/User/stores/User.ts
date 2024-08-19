import type{User} from './../interface/User' 
export const useUserListStore = defineStore('userList',{
        state: () => {
            return {
                per_page:  10 as number,
                total: 0 as number ,
                showDeleteWarning: false as boolean,
                selectedUserId: null as number | null,
                page: 1 as number,
                users: [] as User[],
            }
        },
        getters:{
            getUserList(state:any){
                return state.users
            } 
        },
        actions:{
            setUsers(users: User[]):void {
                this.users = users;
            },
            setTotalPage(total: number , page: number):void {
                this.total = total;
                this.page = page;
            },
            changePage( page: number):void{
                this.page = page;
            },
            toggleDeleteModal(userId: number | null = null):void {
                this.selectedUserId = userId;
                this.showDeleteWarning = !this.showDeleteWarning;
            }
        }
})


