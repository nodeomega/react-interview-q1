/**
 * ListingItem class for name/location combinations.
 */
export class ListingItem {
  /**
   * Creates a new ListingItem.
   * 
   * @param name The name being entered from the text box.
   * @param location The location being entered from the dropdown.
   */
  constructor (name, location) {
    this.name = name;
    this.location = location;
  }
}
