version: '3.3'
services:
  {{ odoo_service_name }}:
    image: odoo:13.0
    depends_on:
      - postgres
    ports:
      - '8069:8069'
    container_name: {{ odoo_container_name }}
    networks:
      - {{ odoo_network }}
    volumes:
      - '{{ odoo_web_data_volume }}:/var/lib/odoo'
      - '{{ odoo_config_folder }}:/etc/odoo'
      - '{{ odoo_addons_folder }}:/mnt/extra-addons'
    environment:
      - USER=odoo_user
      - PASSWORD=odoo_password
      - HOST=postgres

  {{ postgres_service_name }}:
    container_name: {{ postgres_container_name }}
    image: postgres:15
    environment:
      - POSTGRES_USER=odoo_user
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=odoo_password
    volumes:
      - '{{ pgdata_volume }}:/var/lib/postgresql/data'
    networks:
      - {{odoo_network}}
    ports:
      - '5432:5432'

volumes:
  {{ odoo_web_data_volume }}:
  {{ pgdata_volume }}:

networks:
  {{ odoo_network }}:
    driver: bridge
    name: {{ odoo_network }}
