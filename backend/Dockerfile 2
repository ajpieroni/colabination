FROM ruby:latest
  RUN apt-get update && apt-get install -y nodejs
  WORKDIR /app/backend
  COPY Gemfile * ./
  RUN bundle install
  COPY . .
  EXPOSE 8081
  CMD ["rails", "server", "-b", "0.0.0.0"]