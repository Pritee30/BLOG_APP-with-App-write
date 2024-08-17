import Conf from "../conf/Conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);
      this.account = new Account(this.client);
  }  

  // method for appwrite services
  async createAccount({email, password,name}){
    try{
    const userAccount =  await this.account.create( ID.unique(), email, password, name);
    if(userAccount){ 
        // call another method 
        return this.login({ email,password});

    } else{
        return userAccount;    }
}
    catch(error){
      throw error;
    }
  }

  // handle for login
   async login ({email, password}){
     try{
       return  await this.account.createEmailSession(email, password);
     }  
     catch(error){
       throw error;
     }
   }  
 
    // handle for logout 
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite sericve :: getCurrentUser :: error", error);
        }

        return null;  //  if error is occured then it will return null...
    }  

    // handle for logout 
    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite sericve :: logout :: error", error);
        }
    }
}

const authService = new AuthService();  // object becoz we dont need to create a new object always

export default authService;
