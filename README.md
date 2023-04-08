# Agricultural Production, How Much of What is Coming from Where? 

In this project we develoved an interactive app to analyze the top 16 agricultural-producing states, *SD, ND, NM, OK, CO, WY, MO, AZ, CA, IA, NE, TX, IL, KS, MN, MT*, based on the acreage used for crops over the course of years. The data is from the USDA websites https://quickstats.nass.usda.gov/api/. Using the USDA Api, we gather the acreage used for all crops in these states since 1997.

![home](/images/states.png)

The Flask app has three routes: *home, about, and map*.
> about

    In the about page you can find our story and motivations.

> home


    In this page you find three dropdowns for years, states and commodities  which let you choose any combination of those. 
    There are also four checkboxes which allow you to choose the corresponding plot.

![home](/images/home.png)

- We have a Grouped Bar Graph through plotly that shows Produce summary of the selected Vegetables and Grains in relation to the Acres Harvested and Acres Planted.

![Screenshot 2023-04-04 at 9 03 46 PM](https://user-images.githubusercontent.com/117786548/229978369-34e8fc42-4ae8-4706-a166-a72d207e26e5.png)

---------------------------------------------------------------------------------------------------------

- A Donut Chart using the selected Data to show the Produce Summary of the Acres Harvested in relation to all Produced selected.

![Screenshot 2023-04-04 at 9 04 05 PM](https://user-images.githubusercontent.com/117786548/229978382-2b87066e-5db3-412b-9638-5ce25796cafe.png)

---------------------------------------------------------------------------------------------------------

- A Grouped Bar Graph using the selected Data to show the how much produced was Planted and Harvested within in each state.

![Screenshot 2023-04-04 at 9 04 22 PM](https://user-images.githubusercontent.com/117786548/229978404-1e13b556-49f9-4906-8917-eab111f6dd36.png)

---------------------------------------------------------------------------------------------------------

- A Stacked Bar Graph using the selected Data to show the how much produced was Planted and Harvested within in each year.


![Screenshot 2023-04-04 at 9 05 09 PM](https://user-images.githubusercontent.com/117786548/229978414-7ab9ba0b-36c1-4f1b-b6a2-d19b6edd0e5c.png)

---------------------------------------------------------------------------------------------------------
> map

    In the choropleth map, the concentration of agricultural procedures on state level for the most recent census data is shown.


# Resources

> Cleaning and Exploratory Data Analysis

    -  usdaPy_EDA.ipynb
    -  USDA_DataCleaning.ipynb


> Input Source Files

    - usda_original.csv (the original data source)
    - usda_survey_splitted.csv (after clening)

> Flask App

    Flask app includes app.py , static folder, and templates folder
    - static folder
        All static files including javascripts, data sources, and the styling file are in this folder.
    - template folder
        All .html files are in this folder.






