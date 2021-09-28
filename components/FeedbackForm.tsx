import { useRouter } from 'next/router';
import {
  Form,
  Input,
  Button,
  Rate,
  Card,
  Space,
  Result,
  Typography,
} from 'antd';
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_PRODUCT_BY_ID } from '../pages/feedback/[productId]';

type FormValues = {
  name: string;
  email: string;
  rating: number;
  comment: string;
};

export const SUBMIT_REVIEW = gql`
  mutation SubmitReview($productId: ID!, $review: ReviewInput!) {
    submitReview(productId: $productId, review: $review) {
      reviewId
      productId
      name
      email
      created
      rating
      comment
    }
  }
`;

/**
 * Renders the product feedback form for submitting reviews.
 */
const FeedbackForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { productId } = router.query;
  const [submitted, setSubmitted] = useState(false);
  const [submitReview] = useMutation(SUBMIT_REVIEW, {
    refetchQueries: [GET_PRODUCT_BY_ID],
  });

  const onFinish = (review: FormValues) => {
    const created = Date.now();

    submitReview({
      variables: {
        productId,
        review: {
          created,
          ...review,
        },
      },
    });

    setSubmitted(true);
  };

  const onReset = () => form.resetFields();

  if (submitted)
    return (
      <Card>
        <Result
          status="success"
          title="Review submitted"
          subTitle={`Thank you for submitting your review.`}
        />
      </Card>
    );

  return (
    <Card>
      <Typography.Title level={2}>Create review</Typography.Title>
      <Form form={form} name="feedback" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name.' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email address.',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          data-testid="FeedbackForm__Rating"
          name="rating"
          label="Rating"
          rules={[
            {
              required: true,
              message: 'Please give the product a rating.',
            },
          ]}
        >
          <Rate />
        </Form.Item>
        <Form.Item name="comment" label="Leave a comment">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button
              data-testid="FeedbackForm__Submit"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              data-testid="FeedbackForm__Reset"
              htmlType="button"
              onClick={onReset}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FeedbackForm;
