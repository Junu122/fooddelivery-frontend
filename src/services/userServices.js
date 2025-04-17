import userAxiosInstance from "../utils/axios";


export const userServices={
    async userLogin(data){
       try {
        const response=await userAxiosInstance.post('/login',data);
        console.log(response,"response in userservice login")
        return response
       } catch (error) {
        console.log(error)
        return error.response
       }
    },
    async foodLists(){
        try {
            const response=await userAxiosInstance.get('/food-list')
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    },
    async userRegister(data){
        try {
            const response=await userAxiosInstance.post('/register',data);
            return response

        } catch (error) {
            console.log(error,"error in userservice")
            return error.response
        }
    }
}