create schema MONITOR_HOM

CREATE TABLE  MONITOR_HOM.INFO (system varchar(max), name varchar(max), request varchar(max), response varchar(max), status varchar(max), error varchar(max))
CREATE TABLE  MONITOR_HOM.SYSTEM (id varchar(max), name varchar(max), request_url varchar(max), url varchar(max), maintance bit default(0), homologation bit default(0))
CREATE TABLE  MONITOR_HOM.EMAIL (id integer, sender varchar(max), email varchar(max), host varchar(max),  senha varchar(max), port integer, destinations varchar(max) )



insert into MONITOR_HOM.SYSTEM values
(
	'organize-homologacao',
	'Organize Homologacao',
	'http://homologacao.sistemas.com.br/organize/public/api/configuracao/operadora/info',
	'http://homologacao.sistemas.com.br/organize',
	0,
	1);
	
	insert into MONITOR_HOM.SYSTEM values
(
	'organize',
	'Organize',
	'http://organize.sistemas.com.br/organize/public/api/configuracao/operadora/info',
	'http://organize.sistemas.com.br/organize',
	0,
	0);
			
	insert into MONITOR_HOM.SYSTEM values
(
	'zeus-homologacao',
	'Zeus Homologacao',
	'http://homologacao.sistemas.com.br/zeus/public/api/tipo-periodicidade',
	'http://homologacao.sistemas.com.br/zeus',
	0,
	1);
		
	insert into MONITOR_HOM.SYSTEM values
(
	'zeus',
	'Zeus',
	'http://zeus.sistemas.com.br/zeus/public/api/tipo-periodicidade',
	'http://zeus.sistemas.com.br/zeus',
	0,
	0);
	
			
	insert into MONITOR_HOM.SYSTEM values
(
	'app./viver-bem',
	'Viver Bem - Produção(Araruama)',
	'http://app.sistemas.com.br/viver-bem/public/api/sexo',
	'http://app.sistemas.com.br/viver-bem',
	0,
	0);
				
	insert into MONITOR_HOM.SYSTEM values
(
	'app./viver-bem-hom',
	'Viver Bem  - Homologacao(Araruama)',
	'http://app.sistemas.com.br/viver-bem-hom/public/api/sexo',
	'http://app.sistemas.com.br/viver-bem',
	0,
	1);
	
					
	insert into MONITOR_HOM.SYSTEM values
(
	'app./apolo',
	'Apolo  - Produção(Lifecare)',
	'http://app.sistemas.com.br/apolo/public/api/sexo',
	'http://app.sistemas.com.br/apolo',
	0,
	0);
	
		
					
	insert into MONITOR_HOM.SYSTEM values
(
	'simplifi./simplifi',
	'SimpliFi',
	'http://simplifi.sistemas.com.br/apolo/public/api/sexo',
	'http://simplifi.sistemas.com.br/apolo',
	0,
	0)	;
					
	insert into MONITOR_HOM.SYSTEM values
(
	'simplifi./apolo',
	'Apolo - Homologação(Lifecare)',
	'http://simplifi.sistemas.com.br/financas/public/version',
	'http://simplifi.sistemas.com.br/financas',
	0,
	1)	;
					
	insert into MONITOR_HOM.SYSTEM values
(
	'simplifi./alpheuz',
	'Alpheuz',
	'http://simplifi.sistemas.com.br/alpheuz/public/version',
	'http://simplifi.sistemas.com.br/alpheuz',
	0,
	0)	;
					
-- 	insert into MONITOR_HOM.SYSTEM values
-- (
-- 	'',
-- 	'',
-- 	'',
-- 	'',
-- 	false,
-- 	false)