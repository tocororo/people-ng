
import { HttpParams } from "@angular/common/http";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { MatDrawer, PageEvent } from "@angular/material";
import { ActivatedRoute, NavigationExtras, Params, Router } from "@angular/router";

import { AggregationsSelection, Organization, SearchResponse } from "toco-lib";

import { OrgService } from "../org.service";

/**
 * Represents a component that shows the result of a search based on aggregations. 
 * The search result can be showed as a list or charts. 
 */
@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit
{
    /**
     * Indicates the search result type. 
     * Its value is true if the search result is showed as a list. 
     * Its value is false if the search result is showed as charts. 
     * By default, its value is `true`. 
     */
    private _searchResultType: boolean;
    public aggrKeys: Array<any>;
    //TODO: Hacer las definiciones de `ChartType` y `LayoutPosition` como enums. 
    // * Entonces se usan como tipos de los fields `chartType` y `layoutPosition` respectivamente. 
    // * El campo `layoutPosition` sustituye al campo `currentlayout`.
    // * El campo `currentlayout` desaparece. 
    public chartType: "Polar Chart" | "Vertical Bar" | /* "Pie Grid" | */ "Gauge Chart";
    public layoutPosition = [
        {
            name: "Derecha",
            layout: "row-reverse",
            aling: "center baseline",
            width: "22",
        },
        {
            name: "Izquierda",
            layout: "row",
            aling: "center baseline",
            width: "22",
        },
        {
            name: "Arriba",
            layout: "column",
            aling: "center center",
            width: "90",
        },
        {
            name: "Abajo",
            layout: "column-reverse",
            aling: "center center",
            width: "90",
        }
    ];
    public currentlayout;
    public changeLayoutPosition(index: number): void
    {
        this.currentlayout = this.layoutPosition[index];
    }

    pageSize = 5;
    pageIndex = 0;
    pageSizeOptions: number[] = [5, 15, 25, 50, 100];

    public query: string;
    public aggrsSelection: AggregationsSelection;

    /**
     * The search that was requested as an HTTP request/response body that represents serialized parameters. 
     */
    private _params: HttpParams;
    /**
     * Represents the response of the search. 
     */
    public sr: SearchResponse<Organization>;
    queryParams: Params;
    navigationExtras: NavigationExtras;

    public loading: boolean;

    @ViewChild(MatDrawer, { static: false })
    public drawer: MatDrawer;

    public constructor(
        private _cuorService: OrgService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router)
    {
        this._searchResultType = true;  /* The search result is showed as a list. */
        this.aggrKeys = undefined;
        this.chartType = "Polar Chart";
        this.currentlayout = this.layoutPosition[0];

        this.query = "";
        this.aggrsSelection = { };

        this._params = undefined;
        this.sr = undefined;

        this.loading = true;
    }

    public ngOnInit(): void
    {
        this._activatedRoute.queryParamMap.subscribe({
            next: (initQueryParams) => {
                console.log("SearchComponent: _activatedRoute.queryParamMap");
                
                this.aggrsSelection = { };

                for (let index = 0; index < initQueryParams.keys.length; ++index)
                {
                    const key = initQueryParams.keys[index];

                    switch (key)
                    {
                        //TODO: Poner los valores de "size", "page", "q" and "aggrsSel" como valores de un enum; 
                        // este enum se declara en el project "toco-ng" en el fichero "search-utils.ts" dentro de la carpeta "search". 
                        case "size":
                            {
                                this.pageSize = Number.parseInt(initQueryParams.get(key));
                                break;
                            }

                        case "page":
                            {
                                this.pageIndex = Number.parseInt(initQueryParams.get(key));
                                break;
                            }

                        case "q":
                            {
                                this.query = initQueryParams.get(key);
                                break;
                            }

                        default:  /* "aggrsSel" */
                            {
                                if (!this.aggrsSelection.hasOwnProperty(key))
                                {
                                    this.aggrsSelection[key] = [];
                                }
                                this.aggrsSelection[key].push(initQueryParams.get(key));
                                break;
                            }
                    }
                }

                this._updateFetchParams();
                this._fetchSearchRequested();
            },

            error: (e) => { },

            complete: () => { },
        });
    }

    /**
     * Returns the search result type. 
     * Its value is true if the search result is showed as a list. 
     * Its value is false if the search result is showed as charts. 
     * By default, its value is `true`. 
     */
    public get searchResultType(): boolean
    {
        return this._searchResultType;
    }

    /**
     * Toggles the view that is used to show the search result. 
     * If it changes to true, then the search result is showed as a list. 
     * If it changes to false, then the search result is showed as charts. 
     */
    public changeView(): void
    {
        this._searchResultType = !this._searchResultType;
    }

    /**
     * Updates the `_params` that will be used to fetch the search. 
     */
    private _updateFetchParams(): void
    {
        this._params = new HttpParams();

        this._params = this._params.set("size", this.pageSize.toString(10));

        this._params = this._params.set("page", (this.pageIndex + 1).toString(10));

        this._params = this._params.set("q", this.query);

        for (const aggrKey in this.aggrsSelection)
        {
            this.aggrsSelection[aggrKey].forEach((bucketKey) => {
                this._params = this._params.set(aggrKey, bucketKey);
            });
        }
    }

    /**
     * Fetches the search that was requested using the `_params`. 
     */
    private _fetchSearchRequested(): void
    {
        this._cuorService.getOrganizations(this._params).subscribe(
            (response: SearchResponse<Organization>) => {

                // this.pageEvent.length = response.hits.total;
                this.sr = response;

                //TODO: Implement it in another way; this must be done in a generic form. 
                // Los valores 'País', 'Provincia', etc. deben ser obtenidos genéricamente. 
                this.aggrKeys = [
                    { value: this.sr.aggregations.country, key: 'País' },
                    { value: this.sr.aggregations.state, key: 'Provincia' },
                    { value: this.sr.aggregations.status, key: 'Estado' },
                    { value: this.sr.aggregations.types, key: 'Tipo' },
                ]
            },

            (error: any) => {
                console.log("Error in `_fetchSearchRequested` method.");
            },

            () => {
                console.log("Finish the `_fetchSearchRequested` method.");
                this.loading = false;
            }
        );
    }

    public pageChange(event?: PageEvent): void
    {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this._updateQueryParams();
    }

    public aggrChange(event/* ?: AggregationsSelection */): void
    {
        this.aggrsSelection = event;
        this._updateQueryParams();
    }

    public queryChange(event?: string): void
    {
        this.query = event;
        this._updateQueryParams();
    }

    private _updateQueryParams(): void
    {
        this.loading = true;

        this.queryParams = {};

        this.queryParams["size"] = this.pageSize.toString(10);

        this.queryParams["page"] = this.pageIndex.toString(10);

        this.queryParams["q"] = this.query;

        for (const aggrKey in this.aggrsSelection)
        {
            this.aggrsSelection[aggrKey].forEach((bucketKey) => {
                this.queryParams[aggrKey] = bucketKey;
            });
        }
        this.navigationExtras = {
            relativeTo: this._activatedRoute,
            queryParams: this.queryParams,
            queryParamsHandling: "",
        };

        this._router.navigate(["."], this.navigationExtras);
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void
    {
        // console.log("window:resize", window.innerWidth);
        if (window.innerWidth <= 740)
        {
            this.drawer.opened = false;
        }
        else
        {
            this.drawer.opened = true;
        }
    }
}
