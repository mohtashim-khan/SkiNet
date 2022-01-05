import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const SinglePostPage = ({ session }) => {
  let { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    session.get("posts/" + postId).then((response) => {
      if (response.status == 200) {
        setPost(response.data);
      }
    });
  }, [setPost]);

  return (
    <Container className="p-3" style={{
        minHeight: "40vh"
    }}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item href="#" linkAs={() => <Link to="/news">All News</Link>} />
          <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col>
          <h1>{post.title}</h1>
          <small class="text-muted">{post.publishedDate}</small>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePostPage;
