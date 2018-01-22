$(() => {
  handleSubmit = () => {
    $('form').submit(e => {
      e.preventDefault();
      console.log(e.currentTarget);
    });
  }

  handleSubmit();
})