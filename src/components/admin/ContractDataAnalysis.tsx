
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2, RefreshCw, Database } from 'lucide-react';
import { analyzeUserResponses } from '@/utils/dataAnalysis';
import { ContractType } from '@/types/contract';

export function ContractDataAnalysis() {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const contractColors = {
    variabel: "#3b82f6", // blue
    vast1: "#22c55e",    // green
    vast3: "#8b5cf6",    // purple 
    dynamisch: "#f97316" // orange
  };
  
  const contractLabels: Record<ContractType, string> = {
    variabel: "Variabel",
    vast1: "1 jaar vast",
    vast3: "3 jaar vast",
    dynamisch: "Dynamisch"
  };

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeUserResponses();
      if ('error' in result) {
        setError(result.error as string);
      } else {
        setAnalysisData(result);
      }
    } catch (err) {
      setError('Failed to analyze data: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const formatPercentage = (value: number) => {
    return `${Math.round(value * 10) / 10}%`;
  };

  if (loading && !analysisData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-xl font-medium">Analyzing user responses...</p>
        <p className="text-sm text-muted-foreground">This may take a moment as we process the data</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">Analysis Error</CardTitle>
          <CardDescription>
            We encountered a problem while analyzing the data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{error}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={fetchAnalysis} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!analysisData) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>No Data Available</CardTitle>
          <CardDescription>
            No analysis data could be found
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={fetchAnalysis} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const recommendationData = Object.keys(analysisData.counts).map(key => ({
    name: contractLabels[key as ContractType],
    count: analysisData.counts[key],
    percentage: analysisData.percentages[key]
  }));

  const pieData = Object.keys(analysisData.counts).map(key => ({
    name: contractLabels[key as ContractType],
    value: analysisData.counts[key]
  }));

  const averagePercentagesData = Object.keys(analysisData.averagePercentages).map(key => ({
    name: contractLabels[key as ContractType],
    percentage: analysisData.averagePercentages[key]
  }));

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Contract Recommendation Analysis</CardTitle>
        <CardDescription>
          Analysis of {analysisData.total} user responses 
          {analysisData.skipped > 0 && ` (${analysisData.skipped} skipped due to incomplete data)`}
          {analysisData.dataSource && (
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <Database className="h-3.5 w-3.5" />
              <span>Data source: {analysisData.dataSource}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="averages">Average Match</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="space-y-6">
              <div className="grid gap-4">
                {Object.keys(analysisData.counts).map((key) => {
                  const type = key as ContractType;
                  const percentage = analysisData.percentages[type];
                  
                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{contractLabels[type]}</span>
                        <span className="text-sm text-muted-foreground">
                          {analysisData.counts[type]} users ({formatPercentage(percentage)})
                        </span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className="h-2"
                        style={{ 
                          backgroundColor: `${contractColors[type]}20`,
                          "--progress-foreground": contractColors[type] 
                        } as React.CSSProperties}
                      />
                    </div>
                  );
                })}
              </div>
              
              <div className="h-64 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {pieData.map((entry, index) => {
                        const contractType = Object.keys(contractLabels).find(
                          key => contractLabels[key as ContractType] === entry.name
                        ) as ContractType;
                        return <Cell key={`cell-${index}`} fill={contractColors[contractType]} />;
                      })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recommendationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis yAxisId="left" orientation="left" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Percentage', angle: 90, position: 'insideRight' }} />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'percentage') return [`${formatPercentage(value as number)}`, 'Percentage'];
                    return [value, name];
                  }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="Number of Users" fill="#4f46e5" />
                  <Bar yAxisId="right" dataKey="percentage" name="Percentage" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="averages">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={averagePercentagesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis label={{ value: 'Average Match Percentage', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${Math.round(value as number * 10) / 10}%`, 'Average Match']} />
                  <Legend />
                  <Bar 
                    dataKey="percentage" 
                    name="Average Match Percentage" 
                    fill="#10b981"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={fetchAnalysis} 
          variant="outline" 
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Analysis
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
