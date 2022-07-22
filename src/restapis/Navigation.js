
// REST API query
const navFields = 'id,name,slug,menu_items_o2m.id,menu_items_o2m.title,menu_items_o2m.slug'

const getNavigation = () => {
  return `/pages?fields=${navFields}`
}

export default getNavigation