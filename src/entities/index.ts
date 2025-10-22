/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: danhmckinthc
 * Interface for DanhmcKinthc
 */
export interface DanhmcKinthc {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  categoryDescription?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: kinthcvgitrthngd
 * Interface for KinthcvGitrThngd
 */
export interface KinthcvGitrThngd {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
}
