import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
  
      dispatch({ type: FETCH_ALL, payload : data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export const getPostsBySearch=(searchQuery)=>async (dispatch)=>{
    try {
      const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
      console.log("data",data)
    } catch (error) {
      console.log(error)
    }
  }
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload : data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id ,post) => async (dispatch) => {
  try {
    const {data} = await api.updatePost (id,post);
    dispatch ( {type: UPDATE , payload : data} )
  } catch (error) {
    console.log (error)
  }
}
export const deletePost = (id) => async (dispatch) =>{
  try {
    await api.deletePost(id);
    dispatch ({type: DELETE, payload:id})
    console.log("deleted")
  } catch (error) {
    console.log(error)
  }
}
export const likePost = (id) => async (dispatch) => {
  try {
    const {data} = await api.updatePost (id);
    dispatch ( {type: UPDATE , payload : data} )
  } catch (error) {
    console.log(error)
  }
}