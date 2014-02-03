namespace angTodo.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using angTodo.Models;
    internal sealed class Configuration : DbMigrationsConfiguration<angTodo.Models.TodoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "angTodo.Models.TodoContext";
        }

        protected override void Seed(angTodo.Models.TodoContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //context.Todoes.AddOrUpdate(
            //  t => t.TodoId ,
            //  new Todo { Text = "Chapter1 start",Priority=1,DueDate=DateTime.Today },
            //  new Todo { Text = "Play Chess", Priority = 3, DueDate = DateTime.Today },
            // new Todo { Text = "Joging",Priority=2,DueDate=DateTime.Today }
            //);
            //

            var r = new Random();
            var items = Enumerable.Range(1, 50).Select(o => new Todo
            {
                DueDate = new DateTime(2012, r.Next(1, 12), r.Next(1, 28)),
                Priority = (byte)r.Next(10),
                Text = o.ToString()
            }).ToArray();
            context.Todoes.AddOrUpdate(item => new { item.Text }, items);

        }
    }
}
