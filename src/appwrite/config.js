import Conf from "../conf/Conf.js";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(title, slug, content, featuredImage, status, userId) {
    try {
      return await this.databases.createDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // for getting only one document

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //for getting only active status posts (queries is just a variable)
  async getPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        queries

      );
    } catch (error) {
      console.log("Appwrite sericve :: logout :: error", error);
    }
  }

  // file upload services/methods
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        Conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite sericve :: logout :: error", error);
      return false;
    }
  }

  // for deleting file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(Conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite sericve :: logout :: error", error);
      return false;
    }
  }

  // for file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(Conf.appwriteBucketId, fileId);
  }
}
const service = new Service();
export default service;
