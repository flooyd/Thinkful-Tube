$(() => {
  let items = [];

  search = query => {
    const params = {
      part: 'snippet',
      key: 'AIzaSyBxNr2OGUF-GeC2byGuWkWU-RUvpmIxiZI',
      q: query
    };
    $.getJSON('https://www.googleapis.com/youtube/v3/search', params)
    .done(data => {
      parseData(data);
      renderItems();
    })
    .fail(()=> {
      console.log('fail')
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
      });
    });
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
        <img id=${item.videoId} src=${item.url}>
      </li>`
      );
    });
  };

  renderModal = videoId => {
    let src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`;
    $('.video').empty().append(
      `
      <iframe height="100%" width="100%" src=${src} frameborder="0" allowfullscreen></iframe>
      `
    );
    $('.videoModal-js').css('display', 'block');
  }

  handleMainClick = () => {
    $('.videoModal-js').click(e => {
      $('iframe').prop('src', '');
      $('.videoModal-js').css('display', 'none');
    });
  };

  handleSubmit = () => {
    $('form').submit(e => {
      e.preventDefault();
      let val = $('input').val();
      search(val);
    });
  };

  handleVideoClicked = () => {
    $('.results-js').on('click', 'img', e => {
      let videoId = $(e.currentTarget).prop('id');
      renderModal(videoId)
    });
  };

  handleSubmit();
  handleVideoClicked();
  handleMainClick();
})