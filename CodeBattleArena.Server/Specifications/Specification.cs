using CodeBattleArena.Server.Filters;
using System.Linq.Expressions;

namespace CodeBattleArena.Server.Specifications
{
    public class Specification<T> : ISpecification<T>
    {
        public Expression<Func<T, bool>> Criteria { get; protected set; }
        public List<Expression<Func<T, object>>> Includes { get; protected set; } = new();
        public Expression<Func<T, object>> OrderBy { get; protected set; }
        public Expression<Func<T, object>> OrderByDescending { get; protected set; }
        public int? Take { get; protected set; }
        public int? Skip { get; protected set; }
        public IFilter<T>? Filter { get; protected set; }

        public void AddInclude(Expression<Func<T, object>> include) => Includes.Add(include);
        public void ApplyOrderBy(Expression<Func<T, object>> orderBy) => OrderBy = orderBy;
        public void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescending) => OrderByDescending = orderByDescending;
        public void ApplyTake(int take) => Take = take;
        public void ApplySkip(int skip) => Skip = skip;
        public void ApplyFilter(IFilter<T> filter) => Filter = filter;
    }
}
