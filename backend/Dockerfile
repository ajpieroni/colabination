FROM ruby:3.2.2
  RUN apt update
  RUN apt install -y nodejs
  WORKDIR /app/backend
  COPY Gemfile * ./
  RUN bundle install
  COPY . .
  EXPOSE 8081
  CMD ["rails", "server", "-b", "0.0.0.0"]