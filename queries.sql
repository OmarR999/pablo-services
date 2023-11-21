

DROP DATABASE IF EXISTS db_pablo;
CREATE DATABASE db_pablo;
USE db_pablo;

INSERT INTO cat_disease (disease, path_image, directory, has_analytics, has_surveillance) VALUES
  ('Covid-19', 'assets/covid-19.jpg', 'covid-19', false, false),
  ('Dengue', 'assets/dengue.jpg', 'dengue', false, false);

INSERT INTO cat_federal_entity (federal_entity, abbreviation, federal_key, id_key_geojson) VALUES
  ('AGUASCALIENTES', 'AS', 1, 'AGU'),
  ('BAJA CALIFORNIA', 'BC', 2, 'BCN'),
  ('BAJA CALIFORNIA SUR', 'BS', 3, 'BCS'),
  ('CAMPECHE', 'CC', 4, 'CAM'),
  ('COAHUILA DE ZARAGOZA', 'CL', 5, 'COA'),
  ('COLIMA', 'CM', 6, 'COL'),
  ('CHIAPAS', 'CS', 7, 'CHP'),
  ('CHIHUAHUA', 'CH', 8, 'CHH'),
  ('CIUDAD DE MÉXICO', 'DF', 9, 'CMX'),
  ('DURANGO', 'DG', 10, 'DUR'),
  ('GUANAJUATO', 'GT', 11, 'GUA'),
  ('GUERRERO', 'GR', 12, 'GRO'),
  ('HIDALGO', 'HG', 13, 'HID'),
  ('JALISCO', 'JC', 14, 'JAL'),
  ('MÉXICO', 'MC', 15, 'MEX'),
  ('MICHOACÁN DE OCAMPO', 'MN', 16, 'MIC'),
  ('MORELOS', 'MS', 17, 'MOR'),
  ('NAYARIT', 'NT', 18, 'NAY'),
  ('NUEVO LEÓN', 'NL', 19, 'NLE'),
  ('OAXACA', 'OC', 20, 'OAX'),
  ('PUEBLA', 'PL', 21, 'PUE'),
  ('QUERÉTARO', 'QT', 22, 'QUE'),
  ('QUINTANA ROO', 'QR', 23, 'ROO'),
  ('SAN LUIS POTOSÍ', 'SP', 24, 'SLP'),
  ('SINALOA', 'SL', 25, 'SIN'),
  ('SONORA', 'SR', 26, 'SON'),
  ('TABASCO', 'TC', 27, 'TAB'),
  ('TAMAULIPAS', 'TS', 28, 'TAM'),
  ('TLAXCALA', 'TL', 29, 'TLA'),
  ('VERACRUZ DE IGNACIO DE LA LLAVE', 'VZ', 30, 'VER'),
  ('YUCATÁN', 'YN', 31, 'YUC'),
  ('ZACATECAS', 'ZS', 32, 'ZAC'),
  ('ESTADOS UNIDOS MEXICANOS', 'EUM', 36, 'EUM'),
  ('NO APLICA', 'NA', 97, 'NA'),
  ('SE IGNORA', 'SI', 98, 'SI'),
  ('NO ESPECIFICADO', 'NE', 99, 'NE');
