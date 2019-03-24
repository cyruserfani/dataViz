import pandas as pd
import json

#-----------------------pre-processing----------------------------#
map_industry = {'Goods-producing sector': 'Goods Producting',
                'Construction': 'Construction',
                'Manufacturing': 'Manufacturing',
                'Services-producing sector': 'Service',
                'Transportation and warehousing': 'Transportation',
                'Finance, insurance, real estate, rental and leasing': 'Finance',
                'Professional, scientific and technical services': 'Technical Services',
                'Educational services': 'Education',
                'Health care and social assistance': 'Health Care',
                'Information, culture and recreation': 'Arts'}

provinces = ['Newfoundland and Labrador', 'Prince Edward Island', 'Nova Scotia', 'New Brunswick',
             'Quebec', 'Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'British Columbia']
map_provinces = {'Newfoundland and Labrador': 'NL', 'Prince Edward Island': 'PE', 'Nova Scotia': 'NS', 'New Brunswick': 'NB',
                 'Quebec': 'QC', 'Ontario': 'OT', 'Manitoba': 'MB', 'Saskatchewan': 'SK', 'Alberta': 'AB', 'British Columbia': 'BC'}

data = {'Newfoundland and Labrador': {},
        'Prince Edward Island': {},
        'Nova Scotia': {},
        'New Brunswick': {},
        'Quebec': {},
        'Ontario': {},
        'Manitoba': {},
        'Saskatchewan': {},
        'Alberta': {},
        'British Columbia': {}}

format_data = {}
#------------------------------------------------------------------#

#-----------------------output data format 1 (sort by provinces)-------------------------#

# {
#    "YT" : [
#         {  "industry": "Arts",
#            "male": [20000,30000,35000,....] for 2008-2017
#            "female": [30000,31000,32000,...] for 2008-2017
#         },
#         {  "industry": "service",
#            "male": [50000,51000,52000,.....] for 10 years
#            "female": [40000, 41000,42000,...] for 10 years
#         },
#    ],
#    ............other provinces
# }

#----------------------------------------------------------------------------------------#

#-----------------------output data format 2 (sort by industries)-------------------------#

# {
#    "Arts" : [
#         {  "province": "YT",
#            "male": [20000,30000,35000,....] for 2008-2017
#            "female": [30000,31000,32000,...] for 2008-2017
#         },
#         {  "province": "BC",
#            "male": [50000,51000,52000,.....] for 10 years
#            "female": [40000, 41000,42000,...] for 10 years
#         },
#    ],
#    ............other industries
# }

#----------------------------------------------------------------------------------------#


df_raw = pd.read_csv('employment.csv')
data_format = {}
data_format_2 = {}

#-------------------------output data format 1------------------------------------------#
for province in map_provinces:
    data_format[map_provinces[province]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    i = 0
    for industry in map_industry:
        temp = data_format[map_provinces[province]][i]
        temp = {}
        temp["industry"] = map_industry[industry]
        df_male = df_raw[df_raw.Sex == 'Males']
        df_male = df_male[df_male.NAICS == industry]
        df_male = df_male[df_male.GEO == province]
        temp["male"] = df_male.VALUE.tolist()
        df_female = df_raw[df_raw.Sex == 'Females']
        df_female = df_female[df_female.NAICS == industry]
        df_female = df_female[df_female.GEO == province]
        temp["female"] = df_female.VALUE.tolist()
        data_format[map_provinces[province]][i] = temp
        i = i+1

with open('employment_data_1.txt', 'w') as file:
    file.write(json.dumps(data_format))

#--------------------------------------------------------------------------------------#

#----------------------------------output data format 2--------------------------------#
for industry in map_industry:
    data_format_2[industry] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    i = 0
    for province in map_provinces:
        temp = data_format_2[industry][i]
        temp = {}
        temp["province"] = map_provinces[province]
        df_male = df_raw[df_raw.Sex == 'Males']
        df_male = df_male[df_male.NAICS == industry]
        df_male = df_male[df_male.GEO == province]
        temp["male"] = df_male.VALUE.tolist()
        df_female = df_raw[df_raw.Sex == 'Females']
        df_female = df_female[df_female.NAICS == industry]
        df_female = df_female[df_female.GEO == province]
        temp["female"] = df_female.VALUE.tolist()
        data_format_2[industry][i] = temp
        i = i+1

with open('employment_data_2.txt', 'w') as file:
    file.write(json.dumps(data_format_2))

#-------------------------------------------------------------------------------------#
