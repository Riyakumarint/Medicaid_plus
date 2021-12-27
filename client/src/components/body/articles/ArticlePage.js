import React, { useEffect, useState } from "react";
import Loading from "../../utils/notification/Loading";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-stars";
import Comments from "./Comment/Comments";
import { getBlog, deleteBlog } from "../../../api/ArticlesAPI";

const initialState = {
  title: "",
  description: "",
  auther: "",
  autherId: "",
  reviews: {
    rating: 3,
    rater: [],
  },
};

function PostPage({ match }) {
  const [blog, setBlog] = useState(initialState);
  const [rating, setRating] = useState();
  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const token = useSelector((state) => state.token);
  const { user, isLogged, isAdmin, isDoctor } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchData = async () => {
      let data = await getBlog(match.params.id);

      data.reviews.rater.map((rater) => {
        if (rater.userId === user._id) {
          setRating(rater.rating);
        }
        return rater;
      });

      setBlog(data);
    };

    fetchData();
  }, [callback, token, user]);

  const handleRatingChange = async (e) => {
    const res = await axios.post(
      "/blogs/rateBlog",
      { blogId: blog._id, rating: e },
      { headers: { Authorization: token } }
    );
    setCallback(!callback);
  };

  const deletePost = async () => {
    await deleteBlog(blog._id);
    history.push("/articles");
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <img src={blog.coverImage} alt="blog" className="blog_cover_image" />

      <div className="BlogPage">
        <Grid container>
          <Grid item lg={8} md={8} sm={12}>
            <div className="blog_component">
              <h2 className="blog_heading">{blog.title}</h2>
              <h6 className="star_rating">
                <ReactStars
                  count={5}
                  value={Number(blog.reviews.rating)}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
              </h6>

              <Link className="blog_auther" to={`/doctor/${blog.autherId}`}>
                DR. {blog.auther}
                <i class="fa fa-external-link" aria-hidden="true"></i>
              </Link>
              <div className="blog_date">
                <p>{new Date(blog.createdDate).toDateString()}</p>
                {(isDoctor || isAdmin) && (
                  <>
                    <button
                      onClick={() => deletePost()}
                      className="blog_delete"
                    >
                      Delete Article
                    </button>
                  </>
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div className="line-2">
                <hr></hr>
              </div>
            </div>
          </Grid>

          {/* comment and rating block */}
          {isLogged ? (
            <Grid item lg={4} md={4} sm={12}>
              <div className="blog_comment_component">
                <div>
                  <h4 className="comment_heading"> Rate Article</h4>
                  <h6 className="star_rating">
                    <ReactStars
                      count={5}
                      value={rating}
                      onChange={handleRatingChange}
                      size={30}
                      color2={"#ffd700"}
                    />
                  </h6>
                  <br></br>
                </div>
                <Comments blog={blog} />
              </div>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </div>
    </>
  );
}

export default PostPage;
