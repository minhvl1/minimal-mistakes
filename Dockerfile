FROM ruby:3.2

WORKDIR /srv/jekyll

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Expose Jekyll's default port
EXPOSE 4000
EXPOSE 35729
