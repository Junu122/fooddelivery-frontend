import userAxiosInstance from "../utils/axios";


export const userServices={
    async foodLists(){
        try {
            const response=await userAxiosInstance.get('/food-list')
            console.log(response)
            return response
        } catch (error) {
            return error
        }
    }
}