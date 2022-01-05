import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Pagination,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

const NewsBulletinPage = ({ session }) => {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const history = useHistory();

  const searchRef = React.createRef();

  const [searchState, setSearchState] = useState(false);

  const POSTS_PER_PAGE = 5;

  function getPosts() {
    session
      .get("posts", {
        size: POSTS_PER_PAGE,
        page: currentPage,
      })
      .then((resp) => {
        if (resp.status == 200) {
          setPosts(resp.data._embedded.posts);
          setPageCount(resp.data.page.totalPages);
        }
      });
  }

  useEffect(() => {
    getPosts();
  }, [setPosts, currentPage]);

  function performSearch() {
    if (searchRef.current.value.trim().length == 0) return;

    setSearchState(true);
    const searchTerms = searchRef.current.value.split(" ");
    const searchPayload = JSON.stringify(searchTerms);

    session.post("posts/search", searchPayload, {}, true).then((response) => {
      if (response.status == 200) {
        setPosts(response.data);
      }
    });
  }

  function cancelSearch() {
    searchRef.current.value = "";
    setSearchState(false);
    getPosts();
  }

  return (
    <>
      <nav class="navbar navbar-light bg-light sticky-top">
        <div class="container">
          <form class="d-flex">
            <InputGroup className="me-2" on>
              <FormControl
                ref={searchRef}
                placeholder="Search query..."
                aria-label="Search"
                aria-describedby="search-btn"
                required={true}
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    e.preventDefault();
                    performSearch();
                  }
                }}
              />
              <Button variant="outline-secondary" id="search-btn" onClick={performSearch}>
                Search
              </Button>
            </InputGroup>
          </form>

          <Link to="/news/create" className="btn btn-secondary">
            Draft Post
          </Link>
        </div>
      </nav>
      <Container className="p-3">
        <Row>
          {!searchState ? (
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
          ) : (
            <></>
          )}
          <Col>
            <h4>
              {searchState ? (
                <>
                  Search Results{" "}
                  <small onClick={cancelSearch}>
                    <a href="#">Cancel Search</a>
                  </small>{" "}
                </>
              ) : (
                "News & Announcements"
              )}{" "}
            </h4>
            {posts.map((post) => (
              <Card className="mb-2">
                <Card.Body>
                  <Card.Title>
                    {post.title} <Badge bg="secondary">CSP LL Awards</Badge>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{post.publishedDate}</Card.Subtitle>
                  <Card.Text>{post.body}</Card.Text>
                  <a
                    onClick={() => {
                      history.push("/news/view/" + post.id);
                    }}
                    className="btn btn-primary stretched-link btn-sm"
                  >
                    Read more
                  </a>
                </Card.Body>
              </Card>
            ))}

            {!searchState ? (
              <Pagination>
                <Pagination.Prev disabled={currentPage == 0} onClick={() => setCurrentPage(currentPage - 1)} />
                {[...Array(pageCount).keys()].map((page) => {
                  return (
                    <Pagination.Item key={page} active={currentPage == page} onClick={() => setCurrentPage(page)}>
                      {page + 1}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next
                  disabled={currentPage == pageCount - 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewsBulletinPage;
