import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 40px 20px;
  margin-top: auto;
`;

const FeatureCard = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 25px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const CardTitle = styled.h2`
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: white;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const Features = () => (
  <FeaturesSection>
    <FeatureCard>
      <CardTitle>Quality Output</CardTitle>
      <CardDescription>
        Our app delivers high-quality results by precisely understanding user queries and retrieving the most relevant information. It combines the power of advanced indexing and AI-generated insights to ensure accurate and reliable responses.
      </CardDescription>
    </FeatureCard>

    <FeatureCard>
      <CardTitle>Reliable</CardTitle>
      <CardDescription>
        Our app is designed to be scalable, efficiently handling an increasing number of PDFs and complex queries as your needs grow. This ensures consistent performance, even with large volumes of data.
      </CardDescription>
    </FeatureCard>

    <FeatureCard>
      <CardTitle>Efficient</CardTitle>
      <CardDescription>
        The app operates efficiently by quickly processing user queries and retrieving relevant information from indexed PDFs. Its advanced indexing technology minimizes search times, allowing users to find answers almost instantly.
      </CardDescription>
    </FeatureCard>
  </FeaturesSection>
);

export default Features;