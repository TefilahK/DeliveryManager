import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from 'jquery'
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://easypoint.co.il/wp-content/uploads/2020/02/Package-Delivery-1600x900.jpg')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "6rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    },
    fontFamily:"cursive",
    
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  },
  addButton:{
    display: "flex",
      justifyContent: "right"
  }
}));

function Blog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const [blog, setBlog] = React.useState([]);
  const [expand, setExpand] = React.useState(false);

  const getRandomPic=()=>{
    let arr=[
      "https://source.unsplash.com/random/?delivery",
      "https://source.unsplash.com/random/?packages",
      "https://source.unsplash.com/random/?boxes",
      "https://source.unsplash.com/random/?deliveryman",
    ]
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const onClick = () => {
    setExpand(!expand);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
      console.log(e)
      console.log(title)
      console.log(post)
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/posts/addPost",
        data: {title,post,postImg: getRandomPic(),authorEmail:sessionStorage.getItem("userEmail")},
      
      }).done(function(fetchData) {
        console.log(fetchData.post.title)
        setBlog([...blog,{title: fetchData.post.title,
            post:fetchData.post.post,
            authorName:fetchData.post.authorName,
            authorImg:fetchData.post.authorImg,
            img:fetchData.post.img,
            date:new Date(fetchData.post.date).toLocaleDateString('en-GB')}])
        console.log(blog)
        })
        .fail(function(jqXhr) {
        })
        setOpen(false);
  };
  React.useEffect(() => {
    async function fetchPosts() {
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/posts/listPosts",      
      }).done(function(fetchData) {
        let posts=fetchData.posts.map(el=>{
          el.date=new Date(el.date).toLocaleDateString('en-GB')
          return el
        })
        setBlog(fetchData.posts)
        })
        .fail(function(jqXhr) {
          console.log(jqXhr)
        })
    }
    fetchPosts();
  }, []);
  const handleUploadImg=(e)=>{
    console.log(e.target.files)
  }

  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
        <div>
          <Typography  variant="h6"  color="primary"  >
            Blog
          </Typography>
          </div>
          <div>
          {sessionStorage.getItem("permissionType")=="admin" &&<Button variant="outlined" className={classes.addButton} color="primary" onClick={handleClickOpen}>
            Add Post
            </Button>}
        </div>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>Blog</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <Grid container spacing={3}>
          {blog.map((post)=>(
               <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={post.img}
                  title={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                  </Typography>
                  <Typography style={{ fontFamily: 'Open Sans', fontSize:"20px" }} variant="body2" color="textSecondary" component="p">
                  <ShowMoreText
                    lines={2}
                    more={<ExpandMore />}
                    less={<ExpandLess />}
                    onClick={onClick}
                    expanded={expand}
                    width={30}
                    
                    
                >
                   {post.post}
                </ShowMoreText>
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Avatar src={post.authorImg} />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      {post.authorName}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="p">
                      {post.date}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <BookmarkBorderIcon />
                </Box>
              </CardActions>
            </Card>
            </Grid>

          ))}
        </Grid>
  
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
        <DialogContent container spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(event) => setTitle(event.target.value)} 
          />
          </Grid>
           <Grid item xs={12}>
         <TextField
            variant="outlined"
            required
            fullWidth
            multiline
            rows={7}
            name="post"
            label="write your post"
            id="post"
            onChange={(event) => setPost(event.target.value)} 
        />
        </Grid>
        {/* <Grid item xs={12}>
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
            onClick={handleUploadImg}
          />
      
        </Button>
        </Grid> */}
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </div>
  );
}

export default Blog;