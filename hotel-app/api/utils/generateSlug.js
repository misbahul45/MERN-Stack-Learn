export const generateSlug = (title) => {
    title = title.replace(/^\s+|\s+$/g, '');
    title = title.toLowerCase();
  
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to   = "aaaaeeeeiiiioooouuuunc------";
    
    for (let i = 0, l = from.length; i < l; i++) {
      title = title.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    title = title.replace(/[^a-z0-9 -]/g, '')
             .replace(/\s+/g, '-')
             .replace(/-+/g, '-');
  
    return title;
  }
  