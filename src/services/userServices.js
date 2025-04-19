import userAxiosInstance from "../utils/axios";


export const userServices={
    async userLogin(data){
       try {
        const response=await userAxiosInstance.post('/login',data);
        return response
       } catch (error) {
        console.log(error)
        return error.response
       }
    },
    async foodLists(){
        try {
            const response=await userAxiosInstance.get('/food-list')
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
         
            return error.response
        }
    },
    async addToCart(data){
       try {
        const response=await userAxiosInstance.post('/addToCart',data);
        return response
        console.log(response)
       } catch (error) {
        console.log(error)
       }
        
    },
    async removeFromCart(data){
        try {
            const response=await userAxiosInstance.post('/removeFromCart',data)
            return response
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    },
    async userCart(){
        try {
            const response=await userAxiosInstance.get('/userCart')
            return response
        } catch (error) {
            console.log(error)
        }
    }
}