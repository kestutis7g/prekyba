using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using FluentScheduler;
using ShopAPI.Model;
using ShopAPI.Data.Item;
using ShopAPI.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace ShopAPI
{

    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            JobManager.Initialize(new ScheduledJobRegistry());

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }



    public class ScheduledJobRegistry : Registry
    {

        public ScheduledJobRegistry()
        {
            Schedule<MyJob>()
                    .NonReentrant() // Only one instance of the job can run at a time
                    .ToRunOnceAt(DateTime.Now.AddSeconds(3))    // Delay startup for a while
                    .AndEvery(2).Seconds();     // Interval

            // TODO... Add more schedules here
        }
    }


    public class MyJob : IJob
    {


        public void Execute()
        {
            var context = new ShopContext();
            //var books = context.Items.FromSqlRaw("SELECT * From ItemBalance").ToList();
            using (var cont = new ShopContext())
            {
                //var books = cont.Items.FromSqlRaw("SELECT * From ItemBalance").ToList();
            }

            // Execute your scheduled task here
            Console.WriteLine("The time is {0: yyyy-MM-dd HH:mm:ss}", DateTime.Now);


        }
    }
}
