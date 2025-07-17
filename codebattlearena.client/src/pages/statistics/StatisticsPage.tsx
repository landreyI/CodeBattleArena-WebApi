import {
    ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import InlineNotification from "@/components/common/InlineNotification"
import { BarChartCard } from "@/components/common/BarChartCard"
import RadialChart from "@/components/common/RadialChart"
import { usePopularityLanguagesProgramming } from "@/hooks/statistics/usePopularityLanguagesProgramming"
import { useAvgTaskCompletionTimeByDifficulty } from "@/hooks/statistics/useAvgTaskCompletionTimeByDifficulty"
import { usePopularityTaskProgramming } from "@/hooks/statistics/usePopularityTaskProgramming"
import { usePercentageCompletionByDifficulty } from "@/hooks/statistics/usePercentageCompletionByDifficulty"
import { Card, CardHeader } from "@/components/ui/card"
import { RadarChartCard } from "@/components/common/RadarChartCard"

const chartConfig = {
    sessions: { label: "Sessions", color: "var(--color-blue)" },
    time: { label: "Avg. Time (sec):", color: "var(--color-green)" },
    percent: { label: "Completion %:", color: "var(--color-red)" },
    usage: { label: "Usage", color: "var(--color-purple)" },
} satisfies ChartConfig

export function StatisticsPage() {
    const { statistics: langStatistics, loading: langStatisticsLoad, error: langStatisticsError } = usePopularityLanguagesProgramming();
    const { statistics: avgTimeStatistics, loading: avgTimeStatisticsLoad, error: avgTimeStatisticsError } = useAvgTaskCompletionTimeByDifficulty();
    const { statistics: taskStatistics, loading: taskStatisticsLoad, error: taskStatisticsError } = usePopularityTaskProgramming();
    const { statistics: percentageStatistics, loading: percentageStatisticsLoad, error: percentageStatisticsError } = usePercentageCompletionByDifficulty();

    const error = langStatisticsError || avgTimeStatisticsError || taskStatisticsError || percentageStatisticsError;

    return (
        <>
            {error && <InlineNotification message={error.message} className="bg-red" />}

            <div className="flex flex-col gap-6 p-0 justify-center h-full">
                <div className="flex flex-wrap gap-6 justify-center w-full">
                    <div className="w-[90vw] md:w-[60vw] min-h-[320px]">
                        {!langStatisticsLoad && langStatistics ? (
                            <BarChartCard
                                title="Most Popular Languages"
                                chartConfig={chartConfig}
                                chartData={langStatistics}
                                xAxisKey="language"
                                bars={[{ key: 'sessions', color: 'var(--color-blue)' }]}
                            />
                        ) : (
                                <Skeleton className="w-full h-full rounded-xl" />
                        )}
                    </div>

                    <div className="w-[90vw] md:w-[25vw] min-h-[320px]">
                        {!avgTimeStatisticsLoad && avgTimeStatistics ? (
                            <RadarChartCard
                                title="Avg. Task Completion Time"
                                chartConfig={chartConfig}
                                chartData={avgTimeStatistics}
                                xAxisKey="difficulty"
                                bars={[{ key: 'time', color: 'var(--color-green)' }]}
                            />
                        ) : (
                                <Skeleton className="w-full h-full rounded-xl" />
                        )}
                    </div>
                </div>


                <div className="h-fit">
                    {!taskStatisticsLoad && taskStatistics ? (
                        <Card className="p-4 rounded-xl ">
                            <CardHeader className="text-md font-semibold">Completion Rate by Difficulty</CardHeader>
                            <div className="flex flex-wrap gap-6 justify-between">
                                {percentageStatistics.map((percentageStatistic, index) => (
                                    <RadialChart
                                        key={index}
                                        chartConfig={chartConfig}
                                        chartData={[percentageStatistic]}
                                        bars={[{ key: 'percent', color: 'var(--color-red)' }]}
                                        className="h-50 w-50"
                                        metric={{
                                            valueKey: 'percent',
                                            domain: [0, 100],
                                            label: percentageStatistic.difficulty,
                                            formatValue: v => `${v}%`
                                        }}
                                    />
                                ))}
                            </div>
                        </Card>
                    ) : (
                        <Skeleton className="w-full h-[200px] rounded-xl" />
                    )}
                </div>

                <div className="flex flex-wrap gap-6 justify-center h-auto">
                    <div className="w-[90vw] md:w-[25vw] min-h-[320px]">
                        {!avgTimeStatisticsLoad && avgTimeStatistics ? (
                            <BarChartCard
                                title="Avg. Task Completion Time"
                                chartConfig={chartConfig}
                                chartData={avgTimeStatistics}
                                xAxisKey="difficulty"
                                bars={[{ key: 'time', color: 'var(--color-green)' }]}
                            />
                        ) : (
                            <Skeleton className="w-full h-full rounded-xl" />
                        )}
                    </div>

                    <div className="w-[90vw] md:w-[60vw] min-h-[320px]">
                        {!taskStatisticsLoad && taskStatistics ? (
                            <BarChartCard
                                title="Top 5 Programming Tasks"
                                chartConfig={chartConfig}
                                chartData={taskStatistics}
                                xAxisKey="name"
                                bars={[{ key: 'usage', color: 'var(--color-purple)' }]}
                            />
                        ) : (
                            <Skeleton className="w-full h-full rounded-xl" />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticsPage;
