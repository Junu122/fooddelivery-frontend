import { adminAxiosInstance } from "../utils/axios";


export const adminService={
  async adminLogin(data){
   try {
    const response=await adminAxiosInstance.post('/admin-login',data)
    return response
   } catch (error) {
    console.log(error)
   }
  },
    async userdata(){
      try {
        const response=await adminAxiosInstance.get('/userdata')
        console.log(response)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async orderdata(){
      try {
        const response=await adminAxiosInstance.get('/orderdata')
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async fooddata(){
      try {
        const response=await adminAxiosInstance.get('/fooddata')
        console.log(response,"food response")
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async updateOrder(orderid,status){
      console.log(orderid,status)
      try {
        const response=await adminAxiosInstance.post('/update-order',{orderid,status})
        console.log(response)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async updateFood(fooddetails,foodid){
      try {
        const response=await adminAxiosInstance.post('/updatefood',{fooddetails,foodid})
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async updatefodStatus(foodid,foodstatus){
      try {
        const response=await adminAxiosInstance.post('/update-foodstatus',{foodid,foodstatus})
        return response
      } catch (error) {
        console.log(error)
      }
    }

}