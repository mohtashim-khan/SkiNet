import React, { useEffect, useState } from "react";

import { Container, Row, Col, Card, Badge, ListGroup, Pagination } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";


const NewsBulletinPage = ({ session }) => {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const history = useHistory();

  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    session.get("posts", {
        size: POSTS_PER_PAGE,
        page: currentPage
    }).then((resp) => {
      if (resp.status == 200) {
        setPosts(resp.data._embedded.posts);
        setPageCount(resp.data.page.totalPages);
      }
    });
  }, [setPosts, currentPage]);

  return (
    <>
      <nav class="navbar navbar-light bg-light sticky-top">
        <div class="container">
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
          </form>
          <Link to="/news/create" className="btn btn-secondary">
                Draft Post
              </Link>
        </div>
      </nav>
      <Container className="p-3">
        <Row>
          <Col xs={2}>
            <h4>Topics</h4>
            <ListGroup defaultActiveKey="#link1" className="h6">
              <ListGroup.Item className="py-1" action href="#link1">
                CSP LL Awards
              </ListGroup.Item>
              <ListGroup.Item className="py-1" action href="#link2">
                Urgent
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <h4>News {"&"} Announcements</h4>
            {posts.map((post) => (
              <Card className="mb-2">
                <Card.Body>
                  <Card.Title>
                    {post.title} <Badge bg="secondary">CSP LL Awards</Badge>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{post.publishedDate}</Card.Subtitle>
                  <Card.Text>{post.body}</Card.Text>
                  <a onClick={() => {
                    history.push("/news/view/" + post.id)
                  }} className="btn btn-primary stretched-link btn-sm">Read more</a>
                </Card.Body>
              </Card>
            ))}

            <Pagination>
              {/* <Pagination.Prev disabled={currentPage == 1 || currentPage == pageCount} /> */}
              {[...Array(pageCount).keys()].map((page) => {
                return (
                  <Pagination.Item key={page} active={currentPage == page}
                    onClick={() => setCurrentPage(page)}>
                    {page + 1}
                  </Pagination.Item>
                );
              })}
              {/* <Pagination.Next disabled={currentPage == 1 || currentPage == pageCount} /> */}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewsBulletinPage;
