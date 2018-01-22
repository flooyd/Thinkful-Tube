$(() => {
  let items = [];

  search = query => {
    const params = {
      part: 'snippet',
      key: 'AIzaSyBxNr2OGUF-GeC2byGuWkWU-RUvpmIxiZI',
      q: query
    }
    $.getJSON('https://www.googleapis.com/youtube/v3/search', params, data => {
      parseData(data);
      renderItems();
    })
  }

  parseData = data => {
    items = [];
    data.items.forEach(item => {
      items.push({
        url: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        videoId: item.id.videoId
      })
    })
  }

  renderItems = () => {
    const results = $('.results-js');
    $(results).empty();

    items.forEach(item => {
      const videoLink = `https://www.youtube.com/watch?v=${item.videoId}`;
      const channelLink = `https://www.youtube.com/channel/${item.channelId}`
      $(results).append(
      `<li>
        <div class="title">
          ${item.title}
        </div>
        <div>
          Channel: <a href=${channelLink} target=_blank>${item.channel}</a>
        </div>
        <a href=${videoLink} target=_blank><img src=${item.url}></a>
      </li>`
      )
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