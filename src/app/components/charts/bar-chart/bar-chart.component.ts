import { ComputedWikipediaStats } from './../../../models/stats.model';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BaseType } from 'd3';

@Component({
  selector: 'wob-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private _data: Map<string, number> = new Map<string, number>()
  @Input('data')
  set data(values: ReadonlyArray<ComputedWikipediaStats> | null) {
    if (values === null || values.length < 1) {
      this.clear()
      this._data.clear()
    } else {
      values.forEach(stat => stat.categories
        .forEach(category => {
          if (this._data.has(category)) {
            const count: number = this._data.get(category) || 0
            this._data.set(category, count + 1)
          } else {
            this._data.set(category, 1)
          }
        })
      )
      this.drawChart()
    }
  }

  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any> = d3.select("figure");
  
  private readonly xAccessor = (d: {name: string, value: number }) => d.value
  private readonly yAccessor = (d: Array<any>) => d.length || 0

  private readonly barPadding = 1
  private readonly width = 600
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
  }

  private drawChart() {
    this.clear()
    if (!this._data) return

    const categoryDataArray = Array.from(this._data, ([name, value]) => ({ name, value }))
    const xScaleExtent = d3.extent(categoryDataArray, this.xAccessor)
    
    if (xScaleExtent[0] === undefined || xScaleExtent[1] === undefined) return

    const xScale = d3.scaleLinear()
      .domain(xScaleExtent)
      .range([0, this.dimensions.boundedWidth])
      .nice()
      
    const xScaleDomain = xScale.domain()
    if (xScaleDomain[0] === undefined || xScaleDomain[1] === undefined) return

    const binsGenerator = d3.bin<{x0?: number, x1?: number, y0?: number, y1?: number, name: string, value: number}, number>()
      .domain([xScaleDomain[0], xScaleDomain[xScaleDomain.length - 1]])
      .value(this.xAccessor)
    
    const bins = binsGenerator(categoryDataArray)
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, this.yAccessor) || 1])
      .range([this.dimensions.boundedHeight, 0])
      .nice()
      
    const binsGroup = this.svg.append("g")
    const binGroups = binsGroup.selectAll("g")
      .data(bins)
      .join("g")
      
    const barRects = binGroups.append("rect")
      .attr("x", d => xScale(d?.x0 || 0) + this.barPadding / 2)
      .attr("y", d => yScale(this.yAccessor(d)))
      .attr("width", d => d3.max([0, (xScale(d?.x1 || 0) - xScale(d?.x0 || 0) - this.barPadding)]) || 0)
      .attr("height", d => this.dimensions.boundedHeight - yScale(this.yAccessor(d)))
      .attr("fill", "cornflowerblue")
      
    const barText = binGroups.filter(d => this.yAccessor(d) != 0)
      .append("text")
        .attr("x", d => xScale(d?.x0 || 0) + (xScale(d?.x1 || 0) - xScale(d?.x0 || 0)) / 2)
        .attr("y", d => yScale(this.yAccessor(d)) - 5)
        .text(this.yAccessor)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
        .attr("fill", "darkgrey")
        .attr("class", "bar-label")
    
    const mean = d3.mean(categoryDataArray, this.xAccessor)
    if (mean === undefined) return
    const meanLine = this.svg.append("line")
      .attr("x1", xScale(mean))
      .attr("x2", xScale(mean))
      .attr("y1", -15)
      .attr("y2", this.dimensions.boundedHeight)
      .attr("stroke", "maroon")
      .attr("stroke-dasharray", "2px 4px")
      
  const meanLabel = this.svg.append("text")
      .attr("x", xScale(mean))
      .attr("y", -20)
      .text("mean")
      .attr("fill", "maroon")
      .attr("class", "mean-label")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
    
    const xAxisGenerator = d3.axisBottom(xScale)
    const xAxis = this.svg.append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${this.dimensions.boundedHeight}px)`)
      .attr("class", "x-axis")
      
    const xAxisLabel = xAxis.append("text")
      .attr("x", this.dimensions.boundedWidth / 2)
      .attr("y", this.dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .attr("class", "x-axis-label")
      .style("font-size", "1.4em")
      .text("Articles per Category Count")
  }
  
  private clear() {
    this.svg.selectAll("rect").remove()
    this.svg.selectAll(".bar-label").remove()
    this.svg.selectAll(".mean-label").remove()
    this.svg.selectAll("line").remove()
    this.svg.selectAll(".x-axis").remove()
    this.svg.selectAll(".x-axis-label").remove()
  }
  
  private calculateDimensions() {
    this.dimensions.boundedWidth = this.dimensions.width - this.dimensions.margin.left - this.dimensions.margin.right
    this.dimensions.boundedHeight = this.dimensions.height - this.dimensions.margin.top - this.dimensions.margin.bottom
  }

}
