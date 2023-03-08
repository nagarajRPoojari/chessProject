const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("229df26739fa44c2953a0b5860aff295");
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2
  .topHeadlines({
    q: "chess",
  })
  .then((response) => {
    console.log(response);
    /*
    {
      status: "ok",
      articles: [...]
    }
  */
  });
