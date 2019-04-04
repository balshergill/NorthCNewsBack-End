const knexConnection = require("../db/connection");

exports.selectArticles = ({
  sort_by = "created_at",
  order = "desc",
  ...queries
}) => {
  return knexConnection
    .select(
      "articles.article_id",
      "title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .where(queries)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.article_id AS comment_count")
    .orderBy(sort_by, order)
    .returning("*");
};

exports.getOneArticle = id => {
  return knexConnection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "topic",
      "articles.created_at",
      "articles.votes",
      "articles.body"
    )
    .from("articles")
    .where("articles.article_id", "=", id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id as comment_count")
    .groupBy("articles.article_id");
};

exports.updateArticle = (id, voteIncrement) => {
  return knexConnection("articles")
    .from("articles")
    .where("articles.article_id", "=", id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("articles.article_id")
    .increment("votes", voteIncrement)
    .returning("*");
};

exports.removeArticle = id => {
  return knexConnection("articles")
    .where("articles.article_id", "=", id)
    .del();
};
