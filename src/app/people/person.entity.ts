
import { EntityBase, Entity, Params } from 'toco-lib';

/**
 * Entity for `Person` based on schema `...-v1.0.0.json`. 
 */
 export class Person extends Entity
 {
    // ids, uri, country

    /**
     * Person name. 
     */
    name: string;
    /**
     * Person last name. 
     */
     lastName: string;

    /************************************* More Data ******************************/
 }
