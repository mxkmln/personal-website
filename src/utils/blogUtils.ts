export function createSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  
  export function getBlogPosts() {
    
  }