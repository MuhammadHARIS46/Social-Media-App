import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ( { setCurrentId }) => {
  const posts = useSelector((posts) => posts.posts);

  const classes = useStyles();
  // console.log(posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spcaing={3}
    >
      {posts.map((post) => (
        <Grid item key = {post._id} xs={12} sm={6}>
          <Post post={post} setCurrentId = { setCurrentId } />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
