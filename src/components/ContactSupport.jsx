import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="bg-white p-5 shadow rounded">
            <h2 className="text-center mb-4" style={{color: '#FF5A5F'}}>Contact Support</h2>
            {submitted ? (
              <Alert variant="success">
                Thank you for reaching out! We'll get back to you soon.
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Enter subject"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your message"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="danger" type="submit" style={{backgroundColor: '#FF5A5F', borderColor: '#FF5A5F'}}>
                    Send Message
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactSupport;