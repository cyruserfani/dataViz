/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

/**
 * This is a copy of a chart created by Antti Lipponen: https://twitter.com/anttilip?lang=en Thanks a lot!
 */

// disclaimer: this data is not accuarate, don't use it for any puroposes
// first temperature is average for 1973-1980 period

var salaries = {
	'Newfoundland and Labrador': [
		['NL-Goods Producting', 0, 32.54, 33.44, 34.04, 35.64, 38.19, 39.65, 43.43, 40.22, 42.01, 43.38], 
		['NL-Construction', 0, 24.73, 27.44, 26.6, 29.0, 30.5, 34.13, 38.05, 38.97, 37.31, 38.19], 
		['NL-Manufacturing', 0, 30.52, 30.31, 28.31, 29.8, 31.38, 31.5, 36.48, 0, 0, 0], 
		['NL-Service', 0, 26.09, 27.71, 29.46, 30.91, 32.43, 32.48, 32.73, 33.22, 33.78, 34.0], 
		['NL-Transportation', 0, 25.06, 27.18, 28.36, 30.5, 31.12, 33.67, 37.36, 34.63, 36.2, 34.5], 
		['NL-Finance', 0, 27.0, 0, 27.55, 27.92, 0, 0, 30.71, 31.88, 0, 0], 
		['NL-Technical Services', 0, 29.02, 29.06, 30.89, 32.44, 34.39, 33.65, 36.97, 37.13, 37.13, 38.7], 
		['NL-Education', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		['NL-Health Care', 0, 22.81, 0, 26.15, 26.2, 26.57, 27.92, 26.1, 0, 29.44, 30.62], 
		['NL-Arts', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	], 
	'Prince Edward Island': [
		['PE-Goods Producting', 0, 23.86, 24.55, 26.22, 27.38, 25.91, 26.24, 26.01, 28.1, 29.86, 29.8], 
		['PE-Construction', 0, 20.69, 0, 21.19, 0, 0, 0, 23.48, 0, 0, 0], 
		['PE-Manufacturing', 0, 25.0, 25.98, 26.33, 27.93, 26.24, 26.37, 26.1, 28.62, 30.24, 30.35], 
		['PE-Service', 0, 24.76, 25.6, 26.04, 26.01, 26.86, 28.28, 27.94, 28.75, 29.24, 29.53], 
		['PE-Transportation', 0, 24.57, 0, 0, 25.3, 0, 0, 0, 27.56, 0, 0], 
		['PE-Finance', 0, 27.88, 25.89, 27.06, 26.16, 26.96, 25.86, 28.49, 27.87, 0, 0], 
		['PE-Technical Services', 0, 0, 0, 40.91, 0, 0, 0, 0, 37.76, 0, 0], 
		['PE-Education', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		['PE-Health Care', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		['PE-Arts', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	], 
	'Nova Scotia': [
		['NS-Goods Producting', 0, 28.91, 29.12, 31.58, 31.43, 31.95, 33.35, 33.63, 33.96, 34.34, 34.89], 
		['NS-Construction', 0, 24.08, 25.42, 0, 0, 28.23, 29.25, 28.79, 0, 29.88, 32.02], 
		['NS-Manufacturing', 0, 28.16, 27.77, 30.19, 30.61, 30.97, 32.14, 32.65, 32.18, 32.98, 32.07], 
		['NS-Service', 0, 25.72, 26.11, 27.3, 27.94, 28.97, 29.09, 30.0, 30.11, 30.75, 31.92], 
		['NS-Transportation', 0, 26.82, 23.2, 24.95, 26.83, 23.5, 26.43, 31.27, 30.73, 29.63, 30.89], 
		['NS-Finance', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		['NS-Technical Services', 0, 29.21, 28.03, 30.18, 30.64, 31.24, 31.26, 32.79, 33.63, 0, 34.18], 
		['NS-Education', 0, 0, 0, 0, 0, 29.32, 0, 29.12, 0, 29.11, 0], 
		['NS-Health Care', 0, 22.21, 24.0, 25.86, 24.04, 22.92, 24.18, 25.82, 23.89, 23.89, 29.42], 
		['NS-Arts', 0, 21.41, 21.69, 23.11, 24.7, 25.85, 27.42, 25.1, 0, 0, 28.05]
	], 
	'New Brunswick': [
		['NB-Goods Producting', 0, 28.56, 29.27, 30.82, 31.52, 32.16, 32.11, 33.84, 33.28, 35.44, 36.46], 
		['NB-Construction', 0, 24.56, 23.02, 27.18, 28.42, 26.92, 28.89, 29.65, 29.88, 30.53, 30.65], 
		['NB-Manufacturing', 0, 27.37, 28.68, 30.25, 30.85, 32.16, 31.63, 32.82, 32.39, 32.51, 33.69], 
		['NB-Service', 0, 25.17, 26.38, 27.78, 28.72, 29.3, 29.63, 30.91, 31.41, 31.85, 32.45], 
		['NB-Transportation', 0, 24.84, 24.03, 27.33, 28.41, 27.09, 28.83, 29.76, 27.37, 29.53, 30.48], 
		['NB-Finance', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		['NB-Technical Services', 0, 27.99, 30.39, 30.57, 32.29, 31.31, 31.61, 32.93, 35.02, 34.78, 33.36], 
		['NB-Education', 0, 0, 0, 27.88, 30.13, 29.92, 0, 32.57, 0, 32.46, 33.65], 
		['NB-Health Care', 0, 0, 0, 25.11, 26.21, 26.48, 26.31, 29.03, 26.68, 0, 30.32], 
		['NB-Arts', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
    'Quebec': [
        ['QC-Goods Producting', 0, 30.01, 29.82, 31.69, 32.72, 33.66, 34.43, 35.52, 35.12, 35.64, 35.62], 
        ['QC-Construction', 0, 26.92, 26.67, 27.66, 28.29, 0, 31.8, 34.36, 32.17, 33.54, 31.73], 
        ['QC-Manufacturing', 0, 29.42, 29.43, 31.2, 32.14, 32.35, 33.51, 33.65, 34.16, 34.75, 34.47], 
        ['QC-Service', 0, 26.69, 27.32, 28.47, 29.03, 29.76, 30.17, 31.34, 32.27, 32.93, 33.87], 
        ['QC-Transportation', 0, 27.44, 24.95, 25.75, 25.91, 25.2, 28.47, 28.83, 28.0, 29.07, 30.97], 
        ['QC-Finance', 0, 28.14, 29.32, 30.77, 30.71, 30.96, 31.92, 32.86, 35.59, 36.19, 38.3], 
        ['QC-Technical Services', 0, 31.18, 32.48, 34.51, 34.16, 34.34, 33.47, 35.84, 36.62, 37.56, 37.81], 
        ['QC-Education', 0, 26.2, 0, 27.25, 0, 29.95, 0, 0, 0, 0, 0], 
        ['QC-Health Care', 0, 22.75, 24.87, 25.33, 26.07, 25.82, 29.36, 28.66, 27.38, 27.79, 31.42], 
        ['QC-Arts', 0, 23.0, 22.96, 0, 25.44, 25.12, 27.03, 27.93, 28.4, 28.26, 29.8]
    ], 
    'Ontario': [['OT-Goods Producting', 0, 32.77, 32.01, 33.5, 34.41, 35.19, 36.13, 37.2, 37.08, 37.86, 37.84], ['OT-Construction', 0, 29.15, 27.62, 28.99, 31.14, 32.1, 33.03, 34.52, 35.17, 35.2, 33.78], ['OT-Manufacturing', 0, 31.79, 31.01, 32.46, 33.04, 33.99, 34.88, 35.5, 35.2, 36.35, 36.35], ['OT-Service', 0, 28.9, 30.5, 31.72, 32.06, 32.77, 33.15, 33.59, 34.35, 35.1, 36.09], ['OT-Transportation', 0, 26.5, 25.77, 27.32, 27.63, 27.27, 30.44, 32.17, 30.87, 30.92, 30.68], ['OT-Finance', 0, 30.67, 31.96, 32.96, 33.39, 32.84, 33.67, 35.5, 36.53, 37.52, 38.81], ['OT-Technical Services', 0, 33.54, 33.3, 35.6, 35.12, 35.75, 35.05, 37.01, 37.8, 37.8, 38.85], ['OT-Education', 0, 26.22, 30.83, 32.44, 34.36, 35.26, 34.61, 33.71, 34.46, 0, 36.35], ['OT-Health Care', 0, 25.72, 0, 27.61, 26.91, 0, 29.52, 29.78, 29.1, 27.89, 30.26], ['OT-Arts', 0, 25.0, 24.13, 26.3, 26.86, 26.96, 28.87, 27.8, 27.76, 28.61, 30.34]], 'Manitoba': [['MB-Goods Producting', 0, 29.68, 30.5, 32.14, 32.78, 34.02, 35.07, 37.13, 37.68, 37.62, 38.41], ['MB-Construction', 0, 25.42, 27.35, 0, 28.2, 28.88, 31.39, 33.5, 0, 33.09, 35.02], ['MB-Manufacturing', 0, 27.93, 27.95, 30.01, 30.71, 31.32, 32.69, 35.15, 35.9, 35.85, 35.25], ['MB-Service', 0, 25.89, 27.5, 27.82, 28.47, 29.16, 29.92, 30.64, 31.08, 31.82, 32.7], ['MB-Transportation', 0, 26.91, 25.05, 25.92, 26.61, 25.73, 27.63, 31.01, 30.05, 29.31, 30.59], ['MB-Finance', 0, 26.74, 29.17, 30.46, 30.43, 30.52, 30.51, 31.2, 31.71, 0, 0], ['MB-Technical Services', 0, 28.66, 29.81, 30.38, 30.58, 32.55, 0, 34.78, 34.38, 33.78, 34.02], ['MB-Education', 0, 23.92, 0, 27.45, 0, 0, 0, 29.36, 29.46, 0, 0], ['MB-Health Care', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ['MB-Arts', 0, 23.48, 23.49, 25.75, 24.82, 26.78, 33.56, 0, 0, 0, 28.11]], 'Saskatchewan': [['SK-Goods Producting', 0, 35.55, 36.09, 38.67, 39.4, 42.29, 42.49, 45.75, 45.37, 46.55, 46.24], ['SK-Construction', 0, 27.79, 31.24, 32.54, 33.27, 0, 35.5, 38.87, 38.62, 36.92, 38.17], ['SK-Manufacturing', 0, 29.31, 29.83, 0, 32.6, 33.2, 34.69, 35.73, 36.7, 36.79, 36.93], ['SK-Service', 0, 26.93, 27.04, 28.59, 29.46, 31.19, 31.22, 32.24, 32.88, 33.72, 34.9], ['SK-Transportation', 0, 24.31, 26.91, 28.42, 29.97, 29.28, 31.7, 33.74, 34.06, 35.72, 35.32], ['SK-Finance', 0, 28.41, 29.12, 30.12, 29.76, 30.99, 31.72, 33.98, 32.72, 34.16, 0], ['SK-Technical Services', 0, 28.44, 28.04, 30.51, 31.82, 33.74, 33.84, 35.84, 37.85, 35.49, 36.43], ['SK-Education', 0, 0, 0, 0, 29.42, 33.19, 0, 32.65, 33.17, 0, 35.71], ['SK-Health Care', 0, 24.29, 22.58, 25.24, 0, 0, 27.22, 27.91, 26.8, 27.84, 29.72], ['SK-Arts', 0, 23.82, 23.12, 23.96, 24.52, 0, 0, 0, 27.05, 26.71, 28.51]], 'Alberta': [['AB-Goods Producting', 0, 40.25, 41.44, 44.29, 44.95, 46.06, 46.81, 50.73, 50.62, 53.94, 52.28], ['AB-Construction', 0, 32.48, 37.08, 35.25, 36.32, 38.95, 40.55, 45.69, 43.85, 42.99, 41.51], ['AB-Manufacturing', 0, 32.91, 32.52, 37.1, 37.49, 36.91, 37.73, 39.05, 39.09, 0, 39.89], ['AB-Service', 0, 29.43, 30.2, 31.69, 32.64, 33.39, 34.25, 35.07, 36.53, 36.51, 37.37], ['AB-Transportation', 0, 28.81, 30.01, 32.09, 33.11, 31.85, 33.41, 37.08, 39.04, 39.46, 38.53], ['AB-Finance', 0, 33.7, 31.26, 33.97, 34.11, 34.69, 35.17, 36.39, 37.51, 37.48, 39.12], ['AB-Technical Services', 0, 33.93, 34.11, 35.36, 35.63, 37.51, 39.07, 41.04, 43.39, 40.72, 40.52], ['AB-Education', 0, 0, 0, 31.43, 33.01, 33.6, 0, 33.35, 34.76, 34.53, 35.84], ['AB-Health Care', 0, 25.92, 26.92, 26.38, 26.62, 26.65, 28.84, 32.19, 31.67, 34.65, 34.67], ['AB-Arts', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 'British Columbia': [['BC-Goods Producting', 0, 31.53, 31.4, 32.95, 34.15, 35.6, 35.86, 37.61, 37.75, 37.89, 39.01], ['BC-Construction', 0, 27.92, 28.52, 29.21, 31.17, 31.77, 31.4, 35.13, 36.2, 33.79, 36.91], ['BC-Manufacturing', 0, 29.65, 29.09, 31.52, 31.63, 32.44, 33.6, 33.27, 34.68, 36.16, 35.84], ['BC-Service', 0, 28.5, 29.34, 30.08, 30.67, 31.12, 31.59, 32.26, 32.9, 33.28, 34.18], ['BC-Transportation', 0, 29.12, 27.95, 27.89, 27.12, 26.17, 28.68, 30.28, 29.45, 31.11, 31.12], ['BC-Finance', 0, 28.78, 29.92, 32.03, 31.99, 31.97, 32.85, 34.77, 34.9, 37.18, 38.58], ['BC-Technical Services', 0, 32.59, 32.57, 33.47, 33.93, 36.03, 34.66, 36.36, 39.24, 38.81, 38.01], ['BC-Education', 0, 29.6, 31.48, 0, 0, 32.82, 32.93, 33.04, 33.44, 33.02, 35.8], ['BC-Health Care', 0, 25.82, 0, 26.31, 26.48, 27.97, 27.55, 28.67, 30.09, 29.33, 28.9], ['BC-Arts', 0, 24.22, 25.61, 25.0, 25.26, 26.11, 28.26, 29.09, 29.03, 28.23, 28.7]]}

var tuitions = {
	'Newfoundland and Labrador': [
		['NL-Goods Producting', 0], 
		['NL-Construction', 0, '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-12.467', '-12.467', '-12.467'], 
		['NL-Manufacturing', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
		['NL-Service', 0], 
		['NL-Transportation', 0], 
		['NL-Finance', 0, '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-12.467', '-12.467', '-12.467'], 
		['NL-Technical Services', 0, '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333'], 
		['NL-Education', 0, '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-12.467', '-12.467', '-12.467'], 
		['NL-Health Care', 0, '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333'], 
		['NL-Arts', 0, '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333', '-11.333']
	], 
	'Prince Edward Island': [
		['PE-Goods Producting', 0], ['PE-Construction', 0, 0, '-20.933', '-21.600', '-22.000', 0, 0, 0, 0, '-26.044', '-26.800'], ['PE-Manufacturing', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ['PE-Service', 0], ['PE-Transportation', 0], ['PE-Finance', 0, '-20.133', '-20.933', '-21.600', '-22.000', '-22.889', '-23.822', '-24.533', '-25.289', '-26.044', '-26.800'], ['PE-Technical Services', 0, '-20.133', '-20.933', '-21.600', '-22.000', '-22.889', '-23.822', '-24.533', '-25.289', '-26.044', '-26.800'], ['PE-Education', 0, '-20.133', '-20.933', '-21.600', '-22.000', '-22.889', '-23.822', '-24.533', '-33.431', '-34.102', '-35.693'], ['PE-Health Care', 0, '-20.133', 0, 0, 0, 0, '-23.822', '-24.533', '-25.289', '-26.044', '-26.800'], ['PE-Arts', 0, '-20.133', '-20.933', '-21.600', '-22.000', '-22.889', '-23.822', '-24.533', '-25.289', '-26.044', '-26.800']], 'Nova Scotia': [['NS-Goods Producting', 0], ['NS-Construction', 0, '-26.960', '-26.498', '-25.338', '-26.084', '-27.427', '-28.360', '-29.551', '-31.147', '-38.782', '-41.027'], ['NS-Manufacturing', 0, '-26.680', '-26.253', '-25.093', '-25.956', '-25.929', '-27.840', '-28.893', '-30.644', '-31.293', '-32.009'], ['NS-Service', 0], ['NS-Transportation', 0], ['NS-Finance', 0, '-24.467', '-23.947', '-22.787', '-23.618', '-24.600', '-25.684', '-26.502', '-28.053', '-30.324', '-32.364'], ['NS-Technical Services', 0, '-25.724', '-25.093', '-23.929', '-24.836', '-25.973', '-27.338', '-28.613', '-29.969', '-31.298', '-32.738'], ['NS-Education', 0, '-25.538', '-23.782', '-22.760', '-23.596', '-24.502', '-25.111', '-25.871', '-27.111', '-29.036', '-30.929'], ['NS-Health Care', 0, '-27.667', '-26.382', '-25.609', '-26.502', '-27.622', '-28.693', '-29.751', '-31.418', '-32.822', '-33.813'], ['NS-Arts', 0, '-23.916', '-23.284', '-22.124', '-22.876', '-23.787', '-24.476', '-25.484', '-26.889', '-29.507', '-32.084']], 'New Brunswick': [['NB-Goods Producting', 0], ['NB-Construction', 0, '-27.382', '-27.511', '-27.511', '-28.396', '-29.067', '-29.769', '-28.764', '-29.764', '-32.124', '-32.747'], ['NB-Manufacturing', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ['NB-Service', 0], ['NB-Transportation', 0], ['NB-Finance', 0, '-23.973', '-23.991', '-24.231', '-25.333', '-26.404', '-27.151', '-27.973', '-28.067', '-29.569', '-30.467'], ['NB-Technical Services', 0, '-24.449', '-24.453', '-24.453', '-25.338', '-26.164', '-26.991', '-27.800', '-27.844', '-29.111', '-29.729'], ['NB-Education', 0, '-23.524', '-23.520', '-23.520', '-24.400', '-25.093', '-25.920', '-26.480', '-26.876', '-28.036', '-29.018'], ['NB-Health Care', 0, '-22.911', '-23.102', '-23.102', '-23.987', '-24.804', '-25.480', '-26.391', '-26.387', '-27.213', '-27.751'], ['NB-Arts', 0, '-21.867', '-26.880', '-26.880', '-27.764', '-27.876', '-28.822', '-29.742', '-29.440', '-31.129', '-32.009']], 'Quebec': [['QC-Goods Producting', 0], ['QC-Construction', 0, '-8.658', '-9.916', '-10.382', '-10.844', '-10.889', '-11.289', '-11.724', '-12.009', '-12.244', '-12.476'], ['QC-Manufacturing', 0, '-9.627', '-10.493', '-10.973', '-11.467', '-11.293', '-11.747', '-11.924', '-12.387', '-12.622', '-12.053'], ['QC-Service', 0], ['QC-Transportation', 0], ['QC-Finance', 0, '-9.569', '-9.804', '-10.258', '-10.716', '-10.684', '-11.076', '-11.738', '-11.898', '-11.831', '-12.071'], ['QC-Technical Services', 0, '-9.182', '-9.684', '-10.058', '-10.600', '-10.684', '-11.116', '-11.760', '-12.360', '-12.738', '-13.218'], ['QC-Education', 0, '-8.818', '-9.253', '-9.707', '-10.164', '-10.236', '-10.551', '-10.711', '-10.822', '-10.907', '-11.151'], ['QC-Health Care', 0, '-10.413', '-10.862', '-11.347', '-11.858', '-11.636', '-12.111', '-12.480', '-12.782', '-12.813', '-12.924'], ['QC-Arts', 0, '-10.698', '-11.493', '-11.991', '-12.493', '-12.476', '-12.982', '-13.089', '-13.640', '-14.302', '-14.338']], 'Ontario': [['OT-Goods Producting', 0], ['OT-Construction', 0, '-32.560', '-34.516', '-37.044', '-40.876', '-41.671', '-44.333', '-46.218', '-48.902', '-51.480', '-52.920'], ['OT-Manufacturing', 0, '-25.822', '-27.862', '-30.049', '-31.867', '-31.733', '-32.244', '-34.249', '-35.827', '-36.987', '-37.711'], ['OT-Service', 0], ['OT-Transportation', 0], ['OT-Finance', 0, '-28.529', '-30.716', '-32.520', '-37.547', '-37.640', '-39.022', '-39.973', '-40.969', '-42.564', '-45.027'], ['OT-Technical Services', 0, '-26.182', '-27.711', '-29.338', '-31.938', '-32.373', '-33.836', '-35.427', '-36.578', '-37.831', '-39.298'], ['OT-Education', 0, '-22.800', '-23.436', '-24.591', '-25.133', '-27.093', '-27.902', '-28.804', '-29.591', '-29.756', '-30.338'], ['OT-Health Care', 0, '-21.204', '-22.311', '-24.142', '-25.293', '-27.733', '-29.280', '-30.431', '-31.418', '-32.533', '-33.516'], ['OT-Arts', 0, '-23.022', '-24.004', '-25.284', '-24.862', '-26.809', '-27.627', '-27.893', '-29.018', '-30.093', '-31.098']], 'Manitoba': [['MB-Goods Producting', 0], ['MB-Construction', 0, '-22.582', '-22.791', '-23.160', '-22.582', '-22.676', '-23.044', '-23.640', '-24.142', '-24.471', '-25.084'], ['MB-Manufacturing', 0, '-15.502', '-16.191', '-17.004', '-16.822', '-17.293', '-17.564', '-17.991', '-18.329', '-18.556', '-18.800'], ['MB-Service', 0], ['MB-Transportation', 0], ['MB-Finance', 0, '-16.111', '-16.787', '-17.667', '-17.693', '-17.591', '-17.778', '-17.351', '-17.760', '-18.204', '-18.444'], ['MB-Technical Services', 0, '-13.853', '-14.542', '-15.284', '-15.449', '-15.898', '-16.213', '-16.551', '-16.893', '-16.791', '-16.996'], ['MB-Education', 0, '-12.716', '-13.249', '-13.907', '-14.076', '-14.307', '-14.542', '-14.898', '-15.191', '-16.027', '-16.249'], ['MB-Health Care', 0, '-14.640', '-14.871', '-16.080', '-16.173', '-15.258', '-15.484', '-15.796', '-16.160', '-17.227', '-17.204'], ['MB-Arts', 0, '-14.382', '-14.747', '-15.507', '-15.676', '-15.609', '-15.822', '-16.116', '-16.436', '-17.173', '-17.187']], 'Saskatchewan': [['SK-Goods Producting', 0], ['SK-Construction', 0, '-23.213', '-24.213', '-25.547', '-27.880', '-29.787', '-27.084', '-28.373', '-30.058', '-32.467', '-32.640'], ['SK-Manufacturing', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '-26.640'], ['SK-Service', 0], ['SK-Transportation', 0], ['SK-Finance', 0, '-22.044', '-23.040', '-24.316', '-25.724', '-26.827', '-27.871', '-28.876', '-30.129', '-31.120', '-31.840'], ['SK-Technical Services', 0, '-19.804', '-20.409', '-21.378', '-23.124', '-23.640', '-24.627', '-26.369', '-27.111', '-27.844', '-28.627'], ['SK-Education', 0, '-19.907', '-20.511', '-21.484', '-22.724', '-23.827', '-24.836', '-25.756', '-26.520', '-27.498', '-28.284'], ['SK-Health Care', 0, '-19.831', '-20.413', '-21.387', '-23.120', '-23.956', '-25.009', '-26.293', '-27.249', '-28.133', '-28.778'], ['SK-Arts', 0, '-19.618', '-20.213', '-21.164', '-23.169', '-23.973', '-25.196', '-26.262', '-27.418', '-28.387', '-28.707']], 'Alberta': [['AB-Goods Producting', 0], ['AB-Construction', 0, '-21.889', '-19.933', '-24.004', '-25.844', '-26.160', '-26.093', '-26.311', '-28.289', '-28.533', '-28.356'], ['AB-Manufacturing', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '-24.556'], ['AB-Service', 0], ['AB-Transportation', 0], ['AB-Finance', 0, '-21.520', '-22.413', '-22.751', '-25.067', '-27.084', '-27.071', '-27.160', '-25.902', '-26.080', '-25.964'], ['AB-Technical Services', 0, '-21.649', '-22.476', '-22.813', '-22.889', '-23.116', '-23.107', '-23.373', '-23.480', '-23.307', '-23.316'], ['AB-Education', 0, '-21.658', '-22.547', '-22.884', '-22.960', '-23.204', '-23.244', '-23.493', '-23.484', '-23.418', '-23.427'], ['AB-Health Care', 0, '-31.933', '-22.373', '-22.707', '-22.782', '-22.609', '-23.147', '-23.107', '-23.053', '-22.956', '-22.938'], ['AB-Arts', 0, '-21.324', '-21.098', '-21.413', '-21.484', '-21.956', '-21.929', '-22.133', '-22.120', '-22.111', '-22.089']], 'British Columbia': [['BC-Goods Producting', 0], ['BC-Construction', 0, '-19.929', '-20.778', '-20.662', '-21.076', '-21.684', '-22.116', '-22.844', '-24.169', '-24.484', '-25.027'], ['BC-Manufacturing', 0, '-19.298', '-19.689', '-20.080', '-20.480', '-20.889', '-21.307', '-21.733', '-23.582', '-23.982', '-24.564'], ['BC-Service', 0], ['BC-Transportation', 0], ['BC-Finance', 0, '-20.298', '-19.489', '-19.111', '-20.560', '-19.773', '-20.000', '-20.889', '-22.311', '-23.058', '-23.991'], ['BC-Technical Services', 0, '-19.907', '-20.076', '-20.200', '-20.742', '-20.973', '-21.547', '-21.751', '-21.956', '-22.364', '-22.622'], ['BC-Education', 0, '-20.053', '-19.720', '-19.853', '-20.489', '-20.604', '-21.062', '-21.738', '-22.444', '-23.240', '-23.160'], ['BC-Health Care', 0, '-19.898', '-20.302', '-20.249', '-20.613', '-21.133', '-21.556', '-21.733', '-21.987', '-22.187', '-22.351'], ['BC-Arts', 0, '-20.036', '-20.093', '-19.760', '-18.733', '-19.142', '-19.556', '-19.569', '-20.551', '-23.596', '-24.702']]}

var startYear = 2008;
var endYear = 2017;
var currentYear = 2017;
var colorSet = new am4core.ColorSet();

var chart = am4core.create("chartdiv", am4charts.RadarChart);
chart.numberFormatter.numberFormat = "$#.0";
chart.hiddenState.properties.opacity = 0;

chart.startAngle = 270 - 180;
chart.endAngle = 270 + 180;

chart.padding(5,15,5,10)
chart.radius = am4core.percent(65);
chart.innerRadius = am4core.percent(40);

// year label goes in the middle
var yearLabel = chart.radarContainer.createChild(am4core.Label);
yearLabel.horizontalCenter = "middle";
yearLabel.verticalCenter = "middle";
yearLabel.fill = am4core.color("#673AB7");
yearLabel.fontSize = 30;
yearLabel.text = String(currentYear);

// zoomout button
var zoomOutButton = chart.zoomOutButton;
zoomOutButton.parent = chart.rightAxesContainer;

// vertical orientation for zoom out button and scrollbar to be positioned properly
chart.rightAxesContainer.layout = "vertical";
chart.rightAxesContainer.padding(120, 20, 120, 20);

// category axis
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "industry";

var categoryAxisRenderer = categoryAxis.renderer;
var categoryAxisLabel = categoryAxisRenderer.labels.template;
categoryAxisLabel.location = 0.5;
categoryAxisLabel.radius = 28;
categoryAxisLabel.relativeRotation = 90;

categoryAxisRenderer.fontSize = 11;
categoryAxisRenderer.minGridDistance = 10;
categoryAxisRenderer.grid.template.radius = -25;
categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
categoryAxisRenderer.grid.template.interactionsEnabled = false;

categoryAxisRenderer.ticks.template.disabled = true;
categoryAxisRenderer.axisFills.template.disabled = true;
categoryAxisRenderer.line.disabled = true;

categoryAxisRenderer.tooltipLocation = 0.5;
categoryAxis.tooltip.defaultState.properties.opacity = 0;

// value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = -50;
valueAxis.max = 50;
valueAxis.strictMinMax = true;
valueAxis.tooltip.defaultState.properties.opacity = 0;
valueAxis.tooltip.animationDuration = 0;
valueAxis.cursorTooltipEnabled = true;
valueAxis.zIndex = 10;

var valueAxisRenderer = valueAxis.renderer;
valueAxisRenderer.axisFills.template.disabled = true;
valueAxisRenderer.ticks.template.disabled = true;
valueAxisRenderer.minGridDistance = 20;
valueAxisRenderer.grid.template.strokeOpacity = 0.05;


// series
var series = chart.series.push(new am4charts.RadarColumnSeries());
series.columns.template.width = am4core.percent(90);
series.columns.template.strokeOpacity = 0;
series.dataFields.valueY = "value:salary" + currentYear;
series.clustered = false;
series.dataFields.categoryX = "industry";
series.tooltipText = "Salary in {categoryX}:{valueY.value}";

// this makes columns to be of a different color, depending on value
series.heatRules.push({ target: series.columns.template, property: "fill", minValue: -3, maxValue: 6, min: am4core.color("#673AB7"), max: am4core.color("#F44336"), dataField: "valueY" });

// series2
var series2 = chart.series.push(new am4charts.RadarColumnSeries());
series2.columns.template.width = am4core.percent(50);
series2.columns.template.strokeOpacity = 0;
series2.dataFields.valueY = "value:tuition" + currentYear;
series2.clustered = false;
series2.dataFields.categoryX = "industry";
series2.tooltipText = "Tuition fee in {categoryX}:{valueY.value}";
// this makes columns to be of a different color, depending on value
series.heatRules.push({ target: series2.columns.template, property: "fill", minValue: -3, maxValue: 6, min: am4core.color("#25C33E"), max: am4core.color("#1B8D64"), dataField: "valueY" });


// cursor
var cursor = new am4charts.RadarCursor();
chart.cursor = cursor;
cursor.behavior = "zoomX";

cursor.xAxis = categoryAxis;
cursor.innerRadius = am4core.percent(40);
cursor.lineY.disabled = true;

cursor.lineX.fillOpacity = 0.2;
cursor.lineX.fill = am4core.color("#000000");
cursor.lineX.strokeOpacity = 0;
cursor.fullWidthLineX = true;

// year slider
var yearSliderContainer = chart.createChild(am4core.Container);
yearSliderContainer.layout = "vertical";
yearSliderContainer.padding(0, 38, 0, 38);
yearSliderContainer.width = am4core.percent(100);

var yearSlider = yearSliderContainer.createChild(am4core.Slider);
yearSlider.events.on("rangechanged", function () {
    updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
})
yearSlider.orientation = "horizontal";
yearSlider.start = 0.5;
yearSlider.exportable = false;

chart.data = generateRadarData(salaries, tuitions);

function generateRadarData(data1, data2) {
    var data = [];
    var i = 0;
    for (var outCategory in data1) {
        var outCategoryData = data1[outCategory];

        outCategoryData.forEach(function (innerCategory) {
            var rawDataItem = { "industry": innerCategory[0] }

            for (var y = 2; y < innerCategory.length; y++) {
                rawDataItem["value:salary" + (startYear + y - 2)] = innerCategory[y];
            }

            data.push(rawDataItem);
        });

        createRange(outCategory, outCategoryData, i);
        i++;

    }

    for (var outCategory in data2) {
        var outCategoryData = data2[outCategory];

        outCategoryData.forEach(function (innerCategory) {
            var rawDataItem = { "industry": innerCategory[0] }

            for (var y = 2; y < innerCategory.length; y++) {
                rawDataItem["value:tuition" + (startYear + y - 2)] = innerCategory[y];
            }

            data.push(rawDataItem);
        });

        createRange(outCategory, outCategoryData, i);
        i++;

    }
    return data;
}


function updateRadarData(year) {
    if (currentYear != year) {
        currentYear = year;
        yearLabel.text = String(currentYear);
        series.dataFields.valueY = "value:salary" + currentYear;
        series2.dataFields.valueY = "value:tuition" + currentYear;
        chart.invalidateRawData();
    }
}

function createRange(name, outCategoryData, index) {

    var axisRange = categoryAxis.axisRanges.create();
    axisRange.axisFill.interactionsEnabled = true;
    axisRange.text = name;
    // first country
    axisRange.category = outCategoryData[0][0];
    // last country
    axisRange.endCategory = outCategoryData[outCategoryData.length - 1][0];

    // every 3rd color for a bigger contrast
    axisRange.axisFill.fill = colorSet.getIndex(index * 3);
    axisRange.grid.disabled = true;
    axisRange.label.interactionsEnabled = false;
    axisRange.label.bent = true;

    var axisFill = axisRange.axisFill;
    axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
    axisFill.radius = -20; // negative radius means it is calculated from max radius
    axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
    axisFill.fillOpacity = 1;
    axisFill.togglable = true;

    axisFill.showSystemTooltip = true;
    axisFill.readerTitle = "click to zoom";
    axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    axisFill.events.on("hit", function (event) {
        var dataItem = event.target.dataItem;
        if (!event.target.isActive) {
            categoryAxis.zoom({ start: 0, end: 1 });
        }
        else {
            categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
        }
    })

    // hover state
    var hoverState = axisFill.states.create("hover");
    hoverState.properties.innerRadius = -10;
    hoverState.properties.radius = -25;

    var axisLabel = axisRange.label;
    axisLabel.location = 0.5;
    axisLabel.fill = am4core.color("#ffffff");
    axisLabel.radius = 3;
    axisLabel.relativeRotation = 0;
}

var slider = yearSliderContainer.createChild(am4core.Slider);
slider.start = 1;
slider.exportable = false;
slider.events.on("rangechanged", function () {
    var start = slider.start;

    chart.startAngle = 270 - start * 179 - 1;
    chart.endAngle = 270 + start * 179 + 1;

    valueAxis.renderer.axisAngle = chart.startAngle;
})