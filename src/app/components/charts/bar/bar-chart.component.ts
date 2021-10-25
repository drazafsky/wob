import { ComputedWikipediaStats } from './../../../models/stats.model';
import { Component, Input, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { BaseType } from 'd3';

@Component({
  selector: 'wob-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private _data: ReadonlyArray<ComputedWikipediaStats> = []
  @Input('data')
  set data(values: ReadonlyArray<ComputedWikipediaStats> | null) {
    if (values) {
      this._data = values
      this.drawChart()
    }
  }
  
  get data(): ReadonlyArray<ComputedWikipediaStats> | null {
    return this._data
  }
  
  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = d3.select("figure");
  private tooltip: d3.Selection<BaseType, unknown, HTMLElement, any> | undefined
  
  private readonly width = 600
  private readonly xAccessor = (d: ComputedWikipediaStats) => d.wordCount
  private readonly yAccessor = (d: ComputedWikipediaStats) => d.categories.length
  private readonly colorAccessor = (d: ComputedWikipediaStats) => d.wordCount
  private readonly dimensions = {
    width: this.width,
    height: this.width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
    boundedWidth: 0,
    boundedHeight: 0
  }

  constructor() { }
  
  ngOnInit() {
    this.setup()
  }

  private setup(): void {
    this.calculateDimensions()
    
    const wrapper = d3.select("#bar-chart-wrapper")
      .append("svg")
        .attr("width", this.dimensions.width)
        .attr("height", this.dimensions.height)

    this.svg = wrapper
      .append("g")
        .style("transform", `translate(${this.dimensions.margin.left}px, ${this.dimensions.margin.top}px)`)

    this.tooltip = d3.select("#bar-chart-tooltip")
  }

  private drawChart() {
    if (!this.data) return

    const xScaleExtent = d3.extent(this.data, this.xAccessor)
    const yScaleExtent = d3.extent(this.data, this.yAccessor)
    const colorExtent = d3.extent(this.data, this.colorAccessor)
    
    if (xScaleExtent[0] === undefined || xScaleExtent[1] === undefined) return
    if (yScaleExtent[0] === undefined || yScaleExtent[1] === undefined) return
    if (colorExtent[0] === undefined || colorExtent[1] === undefined) return

    const xScale = d3.scaleLinear()
      .domain(xScaleExtent)
      .range([0, this.dimensions.boundedWidth])
      .nice()
      
    const yScale = d3.scaleLinear()
      .domain(yScaleExtent)
      .range([this.dimensions.boundedHeight, 0])
      .nice() 

    const colorScale = d3.scaleLinear<string, string>()
      .domain(colorExtent)
      .range(["skyblue", "darkslategrey"])
      
    const dots = this.svg
      .selectAll("circle")
    
    dots
      .data(this.data)
        .join("circle")
          .attr("cx", d => xScale(this.xAccessor(d)))
          .attr("cy", d => yScale(this.yAccessor(d)))
          .attr("r", 5)
          .attr("fill", d => colorScale(this.colorAccessor(d)))
    dots
      .on("mouseenter", (e: MouseEvent, datum: unknown) => {
        const data = <ComputedWikipediaStats> datum

        this.tooltip?.select("#page-title")
            .text(data.title)

        this.tooltip?.select("#category-count")
            .text(data.categories.length)

       this.tooltip?.select("#word-count")
            .text(data.wordCount)
         
        const x = xScale(this.xAccessor(data)) + this.dimensions.margin.left
        const y = yScale(this.yAccessor(data)) + this.dimensions.margin.top
        
        this.tooltip
          ?.style("transform", `translate(calc(-46% + ${x}px), calc(70% + ${y}px))`)
          .style("opacity", 0.8)
      })
      .on("mouseleave", () => {
        this.tooltip?.style("opacity", 0)
      })
        
    this.svg.select("#xaxis").remove()
    this.svg.select("#xaxis-label").remove()
    const xAxisGenerator = d3.axisBottom(xScale)
    const xAxis = this.svg
      .append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${this.dimensions.boundedHeight}px)`)
        .attr("id", "xaxis")
    const xAxisLabel = xAxis.append("text")
      .attr("x", this.dimensions.boundedWidth / 2)
      .attr("y", this.dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .attr("id", "xaxis-label")
      .style("font-size", "1.4em")
      .html("Word Count")
    
    this.svg.select("#yaxis").remove()
    this.svg.select("#yaxis-label").remove()
    const yAxisGenerator = d3.axisLeft(yScale)
      .ticks(4)
    const yAxis = this.svg.append("g")
      .call(yAxisGenerator)
      .attr("id", "yaxis")
    const yAxisLabel = yAxis.append("text")
      .attr("x", -this.dimensions.boundedHeight / 2)
      .attr("y", -this.dimensions.margin.left - 10)
      .attr("fill", "black")
      .attr("id", "yaxis-label")
      .style("font-size", "1.4em")
      .text("# Categories")
        .style("transform", "rotate(-90deg)")
        .style("text-anchor", "middle")
  }
  
  private calculateDimensions() {
    this.dimensions.boundedWidth = this.dimensions.width - this.dimensions.margin.left - this.dimensions.margin.right
    this.dimensions.boundedHeight = this.dimensions.height - this.dimensions.margin.top - this.dimensions.margin.bottom
  }
}
