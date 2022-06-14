using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;
using ShopAPI.Data.Item;
using ShopAPI.Data.Cart;
using ShopAPI.Data.User;
using ShopAPI.Data.Order;
using ShopAPI.Data.ItemBalance;
using ShopAPI.Data.OrderItem;
using ShopAPI.Data.Route;
using ShopAPI.Data.Address;


namespace ShopAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ShopAPI", Version = "v1" });
            });

            services.AddDbContext<ShopContext>(opt => opt.UseSqlServer
                (Configuration.GetConnectionString("Shop")));

            services.AddScoped<IItemRepo, SqlItemRepo>();
            services.AddScoped<ICartRepo, SqlCartRepo>();
            services.AddScoped<IUserRepo, SqlUserRepo>();
            services.AddScoped<IOrderRepo, SqlOrderRepo>();
            services.AddScoped<IItemBalanceRepo, SqlItemBalanceRepo>();
            services.AddScoped<IOrderItemRepo, SqlOrderItemRepo>();
            services.AddScoped<IRouteRepo, SqlRouteRepo>();
            services.AddScoped<IAddressRepo, SqlAddressRepo>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopAPI v1"));

                app.UseCors(x => x
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ShopContext>();
                context.Database.Migrate();
            }
        }
    }
}
