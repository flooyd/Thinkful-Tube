$(() => {
  const items = [];

  search = query => {
    const params = {
      part: 'snippet',
      key: 'AIzaSyBxNr2OGUF-GeC2byGuWkWU-RUvpmIxiZI',
      q: query
    }
    $.getJSON('https://www.googleapis.com/youtube/v3/search', params, data => {
      parseData(data);
      console.log(items);
      //renderData()
    })
  }

  parseData = data => {
    data.items.forEach(item => {
      items.push({
        url: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        channel: item.snippet.channelTitle
      })

      console.log(item)
    })
  }

  handleSubmit = () => {
    $('form').submit(e => {
      e.preventDefault();
      let val = $('input').val();
      search(val);
    });
  }

  handleSubmit();
})